import { api } from './client';

export interface Holding{
    instrument : string;
    netQuantity: number;
    averageCost: number;
    totalInvested: number;
    totalValue: number;
}

export interface Summary {
    baseCurrency: 'KES' | 'USD';
    valuation: string;
    holdings: Holding[];
    totalInvested : number;
    totalValue: number;
}

export const summaryAPI = {
    get : (portfolioId: string) =>
        api.get<Summary>(`/api/portfolios/${portfolioId}/summary`),
};