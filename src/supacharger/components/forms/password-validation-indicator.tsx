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
  type?: string; // <-- Added type prop
}

export default function PasswordValidationIndicator({
  value,
  onChange,
  name = "newPassword",
  id = "newPassword",
  type = "password", // <-- Default to "password"
}: PasswordValidationIndicatorProps) {
  const tStrengthComponent = useTranslations("evaluatePasswordStrengthComponent");
  const tAuthTerms = useTranslations("AuthTerms");

  const [showTooltip, setShowTooltip] = useState(false);

  // Dynamically build validation items based on config
  const getValidationItems = (): ValidationItem[] => {
    const minLength = SC_CONFIG.PASSWORD_MINIMUM_LENGTH;
    const requirements = SC_CONFIG.PASSWORD_REQUIREMENTS;
    const customRegex = SC_CONFIG.PASSWORD_CUSTOM_REGEX;

    // Custom regex: show only one requirement with custom description
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

    // Always include length
    const items: ValidationItem[] = [
      {
        key: "length",
        label: minLength + " " + tStrengthComponent("passwordMinLength"),
        test: (newPassword: string) => newPassword.length >= minLength,
      },
    ];

    // Add requirements as per config
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
    <div className="space-y-2">
      {/* Label + requirements row, stacks on mobile, right-aligned on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {tAuthTerms("newPassword")}
        </label>
        <div
          className="flex items-center group relative mt-1 sm:mt-0 sm:text-right sm:justify-end hover:cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="text-xs text-gray-500">
            {tStrengthComponent("passwordRequirementsLabel")}
          </span>
          {/* Dots */}
          <div className="flex items-center space-x-2 ml-2">
            {validations.map((isValid, idx) => (
              <div
                key={validationItems[idx].key}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isValid ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm z-50">
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
      </div>
      {/* Password Input */}
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}      // <-- Use the type prop here!
          value={value}
          onChange={onChange}
          className="w-full pr-10"
          maxLength={30}
        />
        {allValid && value.length > 0 && (
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <span className="bg-green-100 rounded-full p-1 flex items-center justify-center">
              <Check className="text-green-600" size={18} />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
