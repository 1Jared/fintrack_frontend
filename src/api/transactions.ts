import { api } from './client';
export interface Transaction {
    id: number;
    portfolioId: number;
    instrument: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    unitPrice: number ;
    tradeDate : string;
    createdAt: string;
}

export interface CreateTransactionRequest {
    instrument: string;
    type: 'BUY' | 'SELL';
    quantity : number;
    unitPrice : number ;
    tradeDate: string
}

export const transactionAPI = {
    list: (portfolioId : string) =>
        api.get<Transaction[]>(`/api/portfolios/${portfolioId}/transactions`),

    create: (portfolioId: string, data: CreateTransactionRequest)=>
        api.post<Transaction>(`/api/portfolios/${portfolioId}/transactions`, data),

    delete:(transactionId: number)=>
        api.delete(`/api/transactions/${transactionId}`)
}