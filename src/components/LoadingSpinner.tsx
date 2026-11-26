import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', fullPage = false }) => {
    const sizeClasses = {
        small: 'w-6 h-4',
        medium: 'w-8 h-8',
        large: 'w-16 h-16',
    };

    const spinner = (
        <div className= {`${sizeClasses[size]} border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin`}></div>
    );

    if (fullPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50/60 to-white">
                {spinner}
            </div>
        );
    }

    return <div className="flex items-center justify-center p-8">{spinner}</div>;
};

export default LoadingSpinner;