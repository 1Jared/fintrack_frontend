import React from 'react';
import clsx from 'clsx';

const fieldClasses = (error?: string , className?: string) => (
    clsx(
        'w-full px-4 py-2.5 bg-white border rounded-xl text-gray-900 placeholder-gray-400 shadow-sm transition',
        'focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:text-gray-500',
        error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary-100',
        className
    )
);

const labelClasses = 'block text-sm font-semibold text-gray-700     mb-1.5';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({label, error, className, ...props}) => (
    <div className="mb-4">
        {label && <label className={labelClasses}>{label}</label>}
        <input {...props} className={fieldClasses(error,className)} />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({label, error, options, className, ...props}) => (
    <div className="mb-4">
        {label && <label className={labelClasses}>{label}</label>}
        <select {...props} className={fieldClasses(error,className)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-600 text-sm mt-1.5">{error}</p>}
    </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({label, error, className, ...props}) => (
    <div className="mb-4">
        {label && <label className={labelClasses}>{label}</label>}
        <textarea {...props} className={fieldClasses(error,className)} />
        {error && <p className="text-red-600 text-sm mt-1.5">{error}</p>}
    </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({variant = 'primary', size = 'md', isLoading=false, children, className, ...props}) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-100',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-100',
        outline: 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-100',
    };

    const sizeClasses = {
        sm: 'px-3.5 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-5 py-3 text-base',
    };

    return (
        <button
            {...props}
            className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
            disabled={isLoading || props.disabled}
        >
            {isLoading && (
                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
            )}
            {isLoading ? 'Please wait...' : children}
        </button>
    );
};
            