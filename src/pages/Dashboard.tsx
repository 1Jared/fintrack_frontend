import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Portfolio, portfolioAPI } from '../api/portfolios';
import { Logo } from '../components/AuthLayout';
import { Button, Input, Select } from '../components/Form';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useAuthStore } from '../store/auth';
import { formatDate, getErrorMessage } from '../utils/helpers';

interface PortfolioForm {
    name: string;
    clientName: string;
    baseCurrency: 'KES' | 'USD';
}

const emptyForm: PortfolioForm = {
    name: '',
    clientName: '',
    baseCurrency: 'KES',
};

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const email = useAuthStore((state) => state.email);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<PortfolioForm>(emptyForm);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadPortfolios();
    }, []);

    const loadPortfolios = async () => {
        setIsLoading(true);
        try {
            const response = await portfolioAPI.list();
            setPortfolios(response.data);
            setError('');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setFormErrors({});
        setShowForm(true);
    };

    const openEdit = (portfolio: Portfolio) => {
        setEditingId(portfolio.id);
        setForm({
            name: portfolio.name,
            clientName: portfolio.clientName,
            baseCurrency: portfolio.baseCurrency,
        });
        setFormErrors({});
        setShowForm(true);
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};
        if (!form.name.trim()) nextErrors.name = 'Portfolio name is required';
        if (!form.clientName.trim()) nextErrors.clientName = 'Client name is required';
        setFormErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setError('');
        setSuccess('');
        try {
            if (editingId) {
                await portfolioAPI.update(editingId, form);
                setSuccess('Portfolio updated successfully');
            } else {
                await portfolioAPI.create(form);
                setSuccess('Portfolio created successfully');
            }
            setShowForm(false);
            await loadPortfolios();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        setIsDeleting(true);
        try {
            await portfolioAPI.delete(deleteConfirm);
            setSuccess('Portfolio deleted successfully');
            setDeleteConfirm(null);
            await loadPortfolios();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsDeleting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        clearAuth();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                    <Logo />
                    <div className="flex items-center gap-3">
                        {email && <span className="hidden text-sm text-gray-500 sm:inline">{email}</span>}
                        <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-5 py-8">
                <div className="mb-7 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-primary">Overview</p>
                        <h1 className="mt-1 text-3xl font-extrabold text-navy-900">Your portfolios</h1>
                    </div>
                    <Button onClick={openCreate}>New portfolio</Button>
                </div>

                {error && <ErrorMessage message={error} className="mb-4" />}
                {success && <SuccessMessage message={success} className="mb-4" />}

                {isLoading ? (
                    <LoadingSpinner />
                ) : portfolios.length === 0 ? (
                    <EmptyState
                        title="No portfolios yet"
                        description="Create a portfolio to start tracking transactions and holdings."
                        action={{ label: 'Create portfolio', onClick: openCreate }}
                    />
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {portfolios.map((portfolio) => (
                            <article key={portfolio.id} className="card p-5 transition-shadow hover:shadow-card-hover">
                                <button
                                    type="button"
                                    className="block w-full text-left"
                                    onClick={() => navigate(`/portfolios/${portfolio.id}`)}
                                >
                                    <div className="mb-5 flex items-start justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-navy-900">{portfolio.name}</h2>
                                            <p className="mt-1 text-sm text-gray-500">{portfolio.clientName}</p>
                                        </div>
                                        <span className="rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary">
                                            {portfolio.baseCurrency}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Created {formatDate(portfolio.createdAt)}
                                    </p>
                                </button>
                                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                                    <Button variant="outline" size="sm" onClick={() => openEdit(portfolio)}>Edit</Button>
                                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => setDeleteConfirm(portfolio.id)}>Delete</Button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h2 className="mb-5 text-xl font-bold text-navy-900">
                            {editingId ? 'Edit portfolio' : 'Create portfolio'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Portfolio name"
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                error={formErrors.name}
                                placeholder="Growth portfolio"
                            />
                            <Input
                                label="Client name"
                                value={form.clientName}
                                onChange={(event) => setForm({ ...form, clientName: event.target.value })}
                                error={formErrors.clientName}
                                placeholder="Client name"
                            />
                            <Select
                                label="Base currency"
                                value={form.baseCurrency}
                                onChange={(event) => setForm({ ...form, baseCurrency: event.target.value as 'KES' | 'USD' })}
                                options={[
                                    { value: 'KES', label: 'KES - Kenyan Shilling' },
                                    { value: 'USD', label: 'USD - US Dollar' },
                                ]}
                            />
                            <div className="mt-2 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setShowForm(false)} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" isLoading={isSubmitting}>
                                    {editingId ? 'Save changes' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={Boolean(deleteConfirm)}
                title="Delete portfolio?"
                message="This permanently removes the portfolio and its transactions."
                confirmText="Delete"
                isDangerous
                isLoading={isDeleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirm(null)}
            />
        </div>
    );
};
