import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Button, Input } from '../components/Form';
import { ErrorMessage } from '../components/Messages';
import { authAPI } from '../api/auth';
import { useAuthStore } from '../store/auth';
import { getErrorMessage, validateEmail } from '../utils/helpers';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const nextErrors: Record<string, string> = {};
        if (!validateEmail(email)) nextErrors.email = 'Enter a valid email address';
        if (!password) nextErrors.password = 'Password is required';
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        setIsSubmitting(true);
        setError('');
        try {
            const response = await authAPI.login(email, password);
            setAuth(response.data.token, response.data.email);
            navigate('/');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to manage your portfolios">
            {error && <ErrorMessage message={error} className="mb-4" />}
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={errors.email}
                    autoComplete="email"
                    placeholder="you@example.com"
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    error={errors.password}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                />
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                    Sign in
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-semibold text-primary hover:text-primary-600">
                    Create an account
                </Link>
            </p>
        </AuthLayout>
    );
};
