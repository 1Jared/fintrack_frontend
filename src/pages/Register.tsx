import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Button, Input } from '../components/Form';
import { ErrorMessage } from '../components/Messages';
import { authAPI } from '../api/auth';
import { useAuthStore } from '../store/auth';
import { getErrorMessage, validateEmail } from '../utils/helpers';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const nextErrors: Record<string, string> = {};
        if (!validateEmail(email)) nextErrors.email = 'Enter a valid email address';
        if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
        if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        setIsSubmitting(true);
        setError('');
        try {
            const response = await authAPI.register(email, password);
            setAuth(response.data.token, response.data.email);
            navigate('/');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout title="Create your account" subtitle="Start tracking your investment portfolios">
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
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                />
                <Input
                    label="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                />
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                    Create account
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary hover:text-primary-600">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
};
