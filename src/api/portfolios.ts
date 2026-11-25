import {api} from './client';

export interface Portfolio {
    id: string,
    name: string,
    client_name: string;
    base_currency: 'KES' | 'USD';
    created_at: string;
}

export interface CreatePortfolioRequest {
    name : string;
    client_name : string;
    base_currency: 'KES' | 'USD';
}

export interface UpdatePortfolioRequest {
    name?: string,
    client_name?: string;
}

export const portfolioAPI = {
list: () =>
    api.get<Portfolio[]>('/api/portfolios'),

get: (id:string)=>
    api.get<Portfolio>(`/api/portfolios/${id}`),

create: (data: CreatePortfolioRequest) =>
    api.post<Portfolio>('/api/portfolios', data),

update:(id: string, data: UpdatePortfolioRequest)=>
    api.put<Portfolio>(`/api/portfolios/${id}`, data),

delete: (id:string) =>
    api.delete(`/api/portfolios/${id}`)

}