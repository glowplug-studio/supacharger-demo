"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, SquareDashed } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SC_CONFIG } from "@/supacharger/supacharger-config";
import { evaluatePasswordStrength } from "@/supacharger/utils/helpers";

// Individual validators
const hasLowercase = (newPassword: string) => /[a-z]/.test(newPassword);
const hasUppercase = (newPassword: string) => /[A-Z]/.test(newPassword);
const hasDigit = (newPassword: string) => /\d/.test(newPassword);
const hasLetter = (newPassword: string) => /[A-Za-z]/.test(newPassword);
const hasSpecial = (newPassword: string) => /[^A-Za-z0-9]/.test(newPassword);

interface ValidationItem {
  key: string;
  label: string;
  test: (password: string) => boolean;
}

interface PasswordValidationIndicatorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  type?: string;
}

export default function PasswordValidationIndicator({
  value,
  onChange,
  name = "newPassword",
  id = "newPassword",
  type = "password",
}: PasswordValidationIndicatorProps) {
  const tStrengthComponent = useTranslations("evaluatePasswordStrengthComponent");
  const tAuthTerms = useTranslations("AuthTerms");

  const [showTooltip, setShowTooltip] = useState(false);

  // Dynamically build validation items based on config
  const getValidationItems = (): ValidationItem[] => {
    const minLength = SC_CONFIG.PASSWORD_MINIMUM_LENGTH;
    const requirements = SC_CONFIG.PASSWORD_REQUIREMENTS;
    const customRegex = SC_CONFIG.PASSWORD_CUSTOM_REGEX;

    if (customRegex) {
      return [
        {
          key: "custom",
          label: tStrengthComponent("passwordCustomRegexDescription"),
          test: (newPassword: string) => {
            try {
              return new RegExp(customRegex).test(newPassword);
            } catch {
              return false;
            }
          },
        },
      ];
    }

    const items: ValidationItem[] = [
      {
        key: "length",
        label: minLength + " " + tStrengthComponent("passwordMinLength"),
        test: (newPassword: string) => newPassword.length >= minLength,
      },
    ];

    switch (requirements) {
      case "letters_digits":
        items.push({
          key: "letter",
          label: tStrengthComponent("passwordLetter"),
          test: hasLetter,
        });
        items.push({
          key: "digit",
          label: tStrengthComponent("passwordDigit"),
          test: hasDigit,
        });
        break;
      case "lower_upper_letters_digits":
        items.push({
          key: "lowercase",
          label: tStrengthComponent("passwordLowercase"),
          test: hasLowercase,
        });
        items.push({
          key: "uppercase",
          label: tStrengthComponent("passwordUppercase"),
          test: hasUppercase,
        });
        items.push({
          key: "digit",
          label: tStrengthComponent("passwordDigit"),
          test: hasDigit,
        });
        break;
      case "lower_upper_letters_digits_symbols":
        items.push({
          key: "lowercase",
          label: tStrengthComponent("passwordLowercase"),
          test: hasLowercase,
        });
        items.push({
          key: "uppercase",
          label: tStrengthComponent("passwordUppercase"),
          test: hasUppercase,
        });
        items.push({
          key: "digit",
          label: tStrengthComponent("passwordDigit"),
          test: hasDigit,
        });
        items.push({
          key: "special",
          label: tStrengthComponent("passwordSymbol"),
          test: hasSpecial,
        });
        break;
      // "no_required": only length
      default:
        break;
    }

    return items;
  };

  const validationItems = getValidationItems();
  const validations = validationItems.map((item) => item.test(value));
  const allValid = validations.every(Boolean);

  return (
    <div className="space-y-2 relative">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {tAuthTerms("newPassword")}
      </label>

      {/* Password Input */}
      <div className="relative px-1">
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          maxLength={30}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />
        {allValid && value.length > 0 && (
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <span className="bg-green-100 rounded-full p-1 flex items-center justify-center">
              <Check className="text-green-600" size={18} />
            </span>
          </span>
        )}
      </div>

      {/* Requirements bar (bars under input) */}
      <div
        className="flex w-full gap-2 mt-2 hover:cursor-pointer px-4"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={tStrengthComponent("passwordRequirementsLabel")}
      >
        {validations.map((isValid, idx) => (
          <div
            key={validationItems[idx].key}
            className={`
              flex-1 h-2 rounded-full transition-colors duration-300
              ${isValid ? "bg-green-500" : "bg-gray-300"}
            `}
          />
        ))}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-50 mt-2 w-72 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm">
          <ul className="space-y-1">
            {validationItems.map((item, idx) => (
              <li key={item.key} className="flex items-center">
                <span
                  className={`mr-2 ${
                    validations[idx] ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {validations[idx] ? (
                    <Check size={15} />
                  ) : (
                    <SquareDashed size={15} />
                  )}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
