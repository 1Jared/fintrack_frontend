export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                primary: {
                   DEFAULT: '#2563EB',
                   50: '#EFF6FF',
                   100: '#DBEAFE',
                   200: '#BFDBFE',
                   300: '#93C5FD',
                   400: '#60A5FA',
                   500: '#3B82F6',
                   600: '#2563EB',
                   700: '#1D4ED8',
                   800: '#1E40AF',
                   900: '#1E3A8A',  
                },
                navy: {800: '#0B1D3A',900: '#0B1D3A',950: '#0B1D3A',},
                secondary: '#10B981',
                danger: '#EF4444',
                warning: '#F59E0B',
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif'],
                sans:['Inter', 'system-ui','sans-serif'],
            },
            boxShadow: {
                card: '0 1px 2px rgba(15, 42, 92, 0.04), 0 4px 16px rgba(15, 42, 92, 0.06)',
                'card-hover': '0 4px 8px rgba(15, 42, 92, 0.06), 0 12px 32px rgba(37, 99, 235, 0.12)',
        },
    }
},
    plugins: [],
};