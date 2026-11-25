import { api } from './client';

export interface Holding{
    instrument : string;
    net_quantity: number;
    average_cost: number;
    total_invested: number;
    total_value: number;
}

export interface Summary {
    base_currency: 'KES' | 'USD';
    valuation: string;
    holdings: Holding[];
    total_invested : number;
    total_value: number;
}

export const summaryAPI = {
    get : (portfolioId: string) =>
        api.get<Summary>(`/api/portfolios/${portfolioId}/summary`),
};