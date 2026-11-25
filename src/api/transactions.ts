import { api } from './client';
import { portfolioAPI } from './portfolios';

export interface Transaction {
    id: string;
    instrument: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    unit_price: number ;
    trade_date : string;
    created_at: string;
}

export interface CreateTransactionRequest {
    instrument: string;
    type: 'BUY' | 'SELL';
    quantity : number;
    unit_price : number ;
    trade_date: string
}

export const transactionAPI = {
    list: (portfolioId : string) =>
        api.get<Transaction[]>(`/api/portfolios/${portfolioId}/transactions`),

    create: (portfolioId: string, data: CreateTransactionRequest)=>
        api.post<Transaction>(`/api/[portfolios/${portfolioId}/transactions`, data),

    delete:(transactionId: string)=>
        api.delete(`/api/transactions/${transactionId}`)
}