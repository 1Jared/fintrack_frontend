export function formatCurrency(value: number, currency : 'KES' | 'USD'): string {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,       
    });
    return formatter.format(value);
}

export function formatDate(dateString: String): string {
    const date = new Date(dateString.toString());
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function formatDateTime(dateString: String): string {
    const date = new Date(dateString.toString());
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}   


export function getErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null) {
        const err = error as any;
        if (err.response?.data?.error?.message) {
            return err.response.data.error.message;
        }
        if (err.message) {
            return err.message;
        }
    }
    return 'An unknown error occurred';
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}   