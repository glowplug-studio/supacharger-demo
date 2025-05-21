"use client";

import { useState } from "react";
import {
  evaluatePasswordStrength,
} from "@/supacharger/utils/helpers";
import { SC_CONFIG } from "@/supacharger/supacharger-config";
import { Input } from "@/components/ui/input";
import { Check, SquareDashed } from "lucide-react";
import { useTranslations } from "next-intl";

// Individual validators (inlined for clarity, or import from your helpers)
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

export default function PasswordValidationIndicator() {
  const tStrengthComponent = useTranslations("evaluatePasswordStrengthComponent");
  const tStrengthErrorCodes = useTranslations("evaluatePasswordStrengthErrorCodes");

  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  // Dynamically build validation items based on config
  const getValidationItems = (): ValidationItem[] => {
    const minLength = SC_CONFIG.PASSWORD_MINIMUM_LENGTH;
    const requirements = SC_CONFIG.PASSWORD_REQUIREMENTS;
    const customRegex = SC_CONFIG.PASSWORD_CUSTOM_REGEX;

    // Custom regex: show only generic requirement
    if (customRegex) {
      return [
        {
          key: "custom",
          label: tStrengthComponent("passwordRequirementsLabel"),
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
  const validations = validationItems.map((item) => item.test(password));
  const passwordStrength = evaluatePasswordStrength(password);

  return (
    <div className="space-y-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        {tStrengthComponent("fieldTitle")}
      </label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full"
        maxLength={30}
      />

      {/* Validation Dots */}
      <div
        className="relative flex items-center justify-center space-x-3 mt-2 hover:cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-xs mr-1">
          {tStrengthComponent("passwordRequirementsLabel")}
        </span>
        {validations.map((isValid, idx) => (
          <div
            key={validationItems[idx].key}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isValid ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full mb-2 w-72 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm z-50">
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
            {password && !passwordStrength.valid && (
              <div className="mt-2 text-red-500">
                {tStrengthErrorCodes(passwordStrength.message)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
