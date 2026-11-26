import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { portfolioAPI, Portfolio } from '../api/portfolios';
import { summaryAPI, Summary } from '../api/summary';
import { CreateTransactionRequest, Transaction, transactionAPI } from '../api/transactions';
import { Logo } from '../components/AuthLayout';
import { Button, Input, Select } from '../components/Form';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { formatCurrency, formatDate, getErrorMessage } from '../utils/helpers';

const today = new Date().toISOString().slice(0, 10);

export const PortfolioDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [form, setForm] = useState<CreateTransactionRequest>({
        instrument: '',
        type: 'BUY',
        quantity: 0,
        unitPrice: 0,
        tradeDate: today,
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (id) loadAll(id);
    }, [id]);

    const loadAll = async (portfolioId: string) => {
        setIsLoading(true);
        setError('');
        try {
            const [portfolioResponse, summaryResponse, transactionsResponse] = await Promise.all([
                portfolioAPI.get(portfolioId),
                summaryAPI.get(portfolioId),
                transactionAPI.list(portfolioId),
            ]);
            setPortfolio(portfolioResponse.data);
            setSummary(summaryResponse.data);
            setTransactions(transactionsResponse.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const openForm = () => {
        setForm({
            instrument: '',
            type: 'BUY',
            quantity: 0,
            unitPrice: 0,
            tradeDate: today,
        });
        setFormErrors({});
        setShowForm(true);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!id) return;

        const nextErrors: Record<string, string> = {};
        if (!form.instrument.trim()) nextErrors.instrument = 'Instrument is required';
        if (!form.quantity || form.quantity <= 0) nextErrors.quantity = 'Quantity must be positive';
        if (!form.unitPrice || form.unitPrice <= 0) nextErrors.unitPrice = 'Unit price must be positive';
        if (!form.tradeDate) nextErrors.tradeDate = 'Trade date is required';
        setFormErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        setIsSubmitting(true);
        setError('');
        setSuccess('');
        try {
            await transactionAPI.create(id, form);
            setShowForm(false);
            setSuccess('Transaction added successfully');
            await loadAll(id);
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
            await transactionAPI.delete(deleteConfirm);
            setSuccess('Transaction deleted successfully');
            setDeleteConfirm(null);
            if (id) await loadAll(id);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) return <LoadingSpinner fullPage />;

    const currency = summary?.baseCurrency || portfolio?.baseCurrency || 'KES';

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                    <Logo />
                    <Button variant="outline" size="sm" onClick={() => navigate('/')}>All portfolios</Button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-5 py-8">
                {error && <ErrorMessage message={error} className="mb-4" />}
                {success && <SuccessMessage message={success} className="mb-4" />}

                {portfolio && (
                    <>
                        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-primary">{portfolio.clientName}</p>
                                <h1 className="mt-1 text-3xl font-extrabold text-navy-900">{portfolio.name}</h1>
                            </div>
                            <Button onClick={openForm}>Add transaction</Button>
                        </div>

                        {summary && (
                            <div className="mb-7 grid gap-4 md:grid-cols-3">
                                <div className="card p-5">
                                    <p className="text-sm text-gray-500">Total invested</p>
                                    <p className="mt-2 text-2xl font-bold text-navy-900">
                                        {formatCurrency(summary.totalInvested, currency)}
                                    </p>
                                </div>
                                <div className="card p-5">
                                    <p className="text-sm text-gray-500">Total value</p>
                                    <p className="mt-2 text-2xl font-bold text-navy-900">
                                        {formatCurrency(summary.totalValue, currency)}
                                    </p>
                                </div>
                                <div className="card p-5">
                                    <p className="text-sm text-gray-500">Valuation</p>
                                    <p className="mt-2 text-2xl font-bold text-navy-900">{summary.valuation}</p>
                                </div>
                            </div>
                        )}

                        {summary?.holdings.length ? (
                            <section className="card mb-7 overflow-hidden">
                                <h2 className="border-b border-gray-100 px-5 py-4 text-lg font-bold text-navy-900">Holdings</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                            <tr>
                                                <th className="px-5 py-3">Instrument</th>
                                                <th className="px-5 py-3">Quantity</th>
                                                <th className="px-5 py-3">Average cost</th>
                                                <th className="px-5 py-3">Invested</th>
                                                <th className="px-5 py-3">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {summary.holdings.map((holding) => (
                                                <tr key={holding.instrument}>
                                                    <td className="px-5 py-4 font-semibold">{holding.instrument}</td>
                                                    <td className="px-5 py-4">{holding.netQuantity}</td>
                                                    <td className="px-5 py-4">{formatCurrency(holding.averageCost, currency)}</td>
                                                    <td className="px-5 py-4">{formatCurrency(holding.totalInvested, currency)}</td>
                                                    <td className="px-5 py-4">{formatCurrency(holding.totalValue, currency)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        ) : null}

                        <section className="card overflow-hidden">
                            <h2 className="border-b border-gray-100 px-5 py-4 text-lg font-bold text-navy-900">Transactions</h2>
                            {transactions.length === 0 ? (
                                <EmptyState
                                    title="No transactions yet"
                                    description="Add your first buy or sell transaction."
                                    action={{ label: 'Add transaction', onClick: openForm }}
                                />
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                            <tr>
                                                <th className="px-5 py-3">Date</th>
                                                <th className="px-5 py-3">Instrument</th>
                                                <th className="px-5 py-3">Type</th>
                                                <th className="px-5 py-3">Quantity</th>
                                                <th className="px-5 py-3">Unit price</th>
                                                <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {transactions.map((transaction) => (
                                                <tr key={transaction.id}>
                                                    <td className="px-5 py-4">{formatDate(transaction.tradeDate)}</td>
                                                    <td className="px-5 py-4 font-semibold">{transaction.instrument}</td>
                                                    <td className="px-5 py-4">
                                                        <span className={`rounded-lg px-2 py-1 text-xs font-bold ${transaction.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {transaction.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">{transaction.quantity}</td>
                                                    <td className="px-5 py-4">{formatCurrency(transaction.unitPrice, currency)}</td>
                                                    <td className="px-5 py-4 text-right">
                                                        <Button variant="outline" size="sm" className="text-red-600" onClick={() => setDeleteConfirm(transaction.id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h2 className="mb-5 text-xl font-bold text-navy-900">Add transaction</h2>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Instrument"
                                value={form.instrument}
                                onChange={(event) => setForm({ ...form, instrument: event.target.value })}
                                error={formErrors.instrument}
                                placeholder="AAPL"
                            />
                            <Select
                                label="Type"
                                value={form.type}
                                onChange={(event) => setForm({ ...form, type: event.target.value as 'BUY' | 'SELL' })}
                                options={[
                                    { value: 'BUY', label: 'BUY' },
                                    { value: 'SELL', label: 'SELL' },
                                ]}
                            />
                            <Input
                                label="Quantity"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={form.quantity || ''}
                                onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })}
                                error={formErrors.quantity}
                            />
                            <Input
                                label="Unit price"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={form.unitPrice || ''}
                                onChange={(event) => setForm({ ...form, unitPrice: Number(event.target.value) })}
                                error={formErrors.unitPrice}
                            />
                            <Input
                                label="Trade date"
                                type="date"
                                value={form.tradeDate}
                                onChange={(event) => setForm({ ...form, tradeDate: event.target.value })}
                                error={formErrors.tradeDate}
                            />
                            <div className="mt-2 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setShowForm(false)} disabled={isSubmitting}>Cancel</Button>
                                <Button type="submit" isLoading={isSubmitting}>Add transaction</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={Boolean(deleteConfirm)}
                title="Delete transaction?"
                message="This removes the transaction and recalculates the portfolio."
                confirmText="Delete"
                isDangerous
                isLoading={isDeleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirm(null)}
            />
        </div>
    );
};
