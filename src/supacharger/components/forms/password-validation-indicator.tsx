"use client"

import { useState, useEffect } from "react";
import { evaluatePasswordStrength } from "@/supacharger/utils/helpers";
import { SC_CONFIG } from "@/supacharger/supacharger-config";
import { Input } from "@/components/ui/input";
import { 
    Check, 
    SquareDashed 
} from "lucide-react";

export default function PasswordValidationIndicator() {
  const [password, setPassword] = useState("")
  const [validations, setValidations] = useState({
    digit: false,
    lowercase: false,
    uppercase: false,
    length: false,
    special: false,
  })
  const [showTooltip, setShowTooltip] = useState(false)

  // Validate password in real-time
  useEffect(() => {
    setValidations({
      digit: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      length: password.length >= 8,
      special: /[^A-Za-z0-9]/.test(password),
    })
  }, [password])

  return (
    <div className="space-y-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full'
          />

          {/* Validation dots */}
          <div
            className="relative flex items-center justify-center space-x-3 mt-2 hover:cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          ><span className="text-xs mr-1">Requirements  </span> 
            {Object.values(validations).map((isValid, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isValid ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-full mb-2 w-64 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm">
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className={`mr-2 ${validations.digit ? "text-green-500" : "text-gray-400"}`}>
                      {validations.digit ? <Check size={15} /> : <SquareDashed size={15} />}
                    </span>
                    Must contain a digit
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${validations.lowercase ? "text-green-500" : "text-gray-400"}`}>
                      {validations.lowercase ? <Check size={15} /> : <SquareDashed size={15} />}
                    </span>
                    Must contain a lowercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${validations.uppercase ? "text-green-500" : "text-gray-400"}`}>
                      {validations.uppercase ? <Check size={15} /> : <SquareDashed size={15} />}
                    </span>
                    Must contain an uppercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${validations.length ? "text-green-500" : "text-gray-400"}`}>
                      {validations.length ? <Check size={15} /> : <SquareDashed size={15} />}
                    </span>
                    Must contain at least 8 characters
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${validations.special ? "text-green-500" : "text-gray-400"}`}>
                      {validations.special ? <Check size={15} /> : <SquareDashed size={15} />}
                    </span>
                    Must contain a special character
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
  )
}
