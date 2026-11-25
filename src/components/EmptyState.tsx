import React from 'react';
import {Button} from './Form';

interface EmptyStateProps {
    icon?: String;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const EmptyState: React.FC<EmptyStateProps> = ({title, description, action}) => {
    <div className="fcard flex flex-col items-center justify-center p-14 text-center border-dashed">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2x1 bg-primary-50 text-primary">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        {description && <p className="text-gray-500 mb-6 max-w-sm">{description}</p>}
        {action && (
            <Button onClick={action.onClick}>
                {action.label}
            </Button>
        )}
    </div>
};      

export default EmptyState;
