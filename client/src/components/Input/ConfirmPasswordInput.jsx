import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function ConfirmPasswordInput({ value, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
            <div className="relative flex items-center">
                <input
                    value={value}
                    onChange={onChange}
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-darkTeal"
                    placeholder={placeholder || "Confirm password"}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                    {showPassword ? (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default ConfirmPasswordInput;
