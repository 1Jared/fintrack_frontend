import React from "react";

const features = [
    "Track every portfolio in one place",
    "Get real-time holdings and insights",
    "Analyze your portfolio performance with advanced analytics",
];

export const Logo: React.FC<{ light?: boolean }> = ({ light }) => (
    <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-700 shadow-lg shadow-primary/30">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M15 7h6v6" />
            </svg>
        </div>
        <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>FinTrack</span>
    </div>
);

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white"> 
        <div className="relative hidden flex-col justify-between gap-8 overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-primary-800 p-10 text-white lg:flex xl:p-12">
            <div className="absolute right-24 top-24 h-96 w-96 rounded-full bg-primary-500/30 blur-3xl" />
            <div className="absolute bottom-32 left-16 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl" />
            <div className="relative flex flex-1 flex-col justify-between">
                <Logo light />
                <div className="relative max-w-md">
                    <h2 className="text-3xl font-extrabold leading-tight xl:text-4xl">
                        Smarter portfolio management for modern advisors
                    </h2>
                    <ul className="mt-8 space-y-4">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-primary-100">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center bg-gradient-to-br from-primary-50/60 to-white px-5 py-8 sm:px-12 sm:py-12">
            <div className="w-full max-w-sm sm:max-w-md">
                <div className="mb-6 lg:hidden">
                    <Logo />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">{title}</h1>
                <p className="mb-6 mt-1.5 text-sm text-gray-500 sm:text-base">{subtitle}</p>
                {children}
            </div>
        </div>
    </div>
);