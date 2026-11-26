import {api} from './client';

export interface Portfolio {
    id: number,
    name: string,
    clientName: string;
    baseCurrency: 'KES' | 'USD';
    createdAt: string;
}

export interface CreatePortfolioRequest {
    name : string;
    clientName : string;
    baseCurrency: 'KES' | 'USD';
}

export type UpdatePortfolioRequest = CreatePortfolioRequest;

export const portfolioAPI = {
list: () =>
    api.get<Portfolio[]>('/api/portfolios'),

get: (id: string | number)=>
    api.get<Portfolio>(`/api/portfolios/${id}`),

create: (data: CreatePortfolioRequest) =>
    api.post<Portfolio>('/api/portfolios', data),

update:(id: string | number, data: UpdatePortfolioRequest)=>
    api.put<Portfolio>(`/api/portfolios/${id}`, data),

delete: (id: string | number) =>
    api.delete(`/api/portfolios/${id}`)

}