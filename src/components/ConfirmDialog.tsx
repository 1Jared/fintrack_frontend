import React from 'react';
import {Button} from './Form';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
    onConfirm: () => void;
    onCancel: () => void;   
    isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDangerous = false,
    onConfirm,
    onCancel,
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-navy-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2x1 shadow-2x1 p-6 w-full max-w-md">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${isDangerous ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary'}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21  12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-grey-900 mb-1">{title}</h2>
                <p className="text-sm text-grey-500 mb-6 ">{message}</p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onCancel} disabled={isLoading}>
                        {cancelText}
                    </Button>
                    <Button variant={isDangerous ? "danger" : "primary"} onClick={onConfirm} disabled={isLoading}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;

