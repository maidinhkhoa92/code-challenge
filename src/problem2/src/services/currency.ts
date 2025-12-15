import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

// Base API configuration
const api = axios.create({
  baseURL: 'https://interview.switcheo.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for the API response
export interface PriceData {
  currency: string;
  date: string;
  price: number;
}

// API functions
export const currencyAPI = {
  // Fetch all prices from the endpoint
  getPrices: async (): Promise<PriceData[]> => {
    const response = await api.get<PriceData[]>('/prices.json');
    return response.data;
  },

  // Get unique currencies from the data
  getCurrencies: async (): Promise<string[]> => {
    const prices = await currencyAPI.getPrices();
    const currencies = [...(prices.map(item => item.currency))];
    return currencies.sort();
  },
};

// React Query hooks
export const usePrices = (options?: UseQueryOptions<PriceData[], Error>) => {
  return useQuery({
    queryKey: ['prices'],
    queryFn: currencyAPI.getPrices,
    ...options,
  });
};

export const useCurrencies = (options?: UseQueryOptions<string[], Error>) => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: currencyAPI.getCurrencies,
    ...options,
  });
};

// Query keys for manual cache invalidation
export const queryKeys = {
  prices: ['prices'] as const,
  currencies: ['currencies'] as const,
  latestPrice: (currency: string) => ['latestPrice', currency] as const,
  currencyHistory: (currency: string) => ['currencyHistory', currency] as const,
};