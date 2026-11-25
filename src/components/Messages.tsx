import React from 'react';
import clsx from 'clsx';

interface MessageProps {
    message: string;
    className?: string;
}

const base = 'border-l-4 px-4  py-3 rounded-xl shadow-sm';

export const ErrorMessage: React.FC<MessageProps> = ({message, className}) => (
    <div role="alert" className={clsx(base, 'bg-red-50 border-red-400 text-red-700', className)}>
        <p className="font-medium text-sm">{message}</p>
    </div>
);

export const SuccessMessage: React.FC<MessageProps> = ({message, className}) => (
    <div role="status" className={clsx(base, 'bg-green-50 border-green-400 text-green-700', className)}>
        <p className="font-medium text-sm">{message}</p>
    </div>
);

export const InfoMessage: React.FC<MessageProps> = ({message, className}) => (
    <div role="status" className={clsx(base, 'bg-blue-50 border-blue-400 text-blue-700', className)}>
        <p className="font-medium text-sm">{message}</p>
    </div>
);