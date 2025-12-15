import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { swapSchema } from '../validations';
import type { SwapFormData } from '../validations';
import { usePrices } from '../services';
import type { Control } from 'react-hook-form';

interface UseSwapReturn {
  // Form handling
  handleSubmit: ReturnType<typeof useForm<SwapFormData>>['handleSubmit'];
  formState: ReturnType<typeof useForm<SwapFormData>>['formState'];
  control: Control<SwapFormData>;
  watchedValues: SwapFormData;
  
  // Swap logic
  onSubmit: (data: SwapFormData) => void;
  calculateToAmount: (fromAmount: number, fromCurrency: string, toCurrency: string) => number | null;
  
  // State
  isSwapping: boolean;
}

export const useSwap = (): UseSwapReturn => {
  const [isSwapping, setIsSwapping] = useState(false);
  
  const { data: prices } = usePrices();
  
  const form = useForm<SwapFormData>({
    resolver: zodResolver(swapSchema),
    defaultValues: {
      fromAmount: undefined,
      fromCurrency: '',
      toAmount: '',
      toCurrency: '',
    },
    mode: 'onChange',
  });
  
  const { control, handleSubmit, formState, setValue } = form;
  const watchedValues = form.watch();
  
  // Calculate exchange rate between two currencies
  const calculateToAmount = useCallback(
    (fromAmount: number, fromCurrency: string, toCurrency: string): number | null => {
      if (!prices || !fromAmount || !fromCurrency || !toCurrency) {
        return null;
      }
      
      // Find the latest prices for both currencies
      const fromPrices = prices
        .find(p => p.currency.toLowerCase() === fromCurrency.toLowerCase());
      
      const toPrices = prices
        .find(p => p.currency.toLowerCase() === toCurrency.toLowerCase());
      
      if (!fromPrices || !toPrices) {
        return null;
      }
      
      const fromPrice = fromPrices.price;
      const toPrice = toPrices.price;
      
      // Calculate the exchange rate and convert
      const exchangeRate = fromPrice / toPrice;
      const toAmount = fromAmount * exchangeRate;
      
      return Math.round(toAmount * 100) / 100; // Round to 2 decimal places
    },
    [prices]
  );
  
  // Handle form submission
  const onSubmit = useCallback(
    async (data: SwapFormData) => {
      setIsSwapping(true);
      
      try {
        // Simulate swap processing
        const toAmount = calculateToAmount(data.fromAmount, data.fromCurrency, data.toCurrency);
        console.log(1, toAmount)
        await new Promise(resolve => setTimeout(resolve, 3000));

        setValue('toAmount', toAmount?.toString() || '');
      } catch (error) {
        console.error('Swap failed:', error);
      } finally {
        setIsSwapping(false);
      }
    },
    [calculateToAmount, setValue]
  );
  
  return {
    // Form handling
    control,
    handleSubmit,
    formState,
    watchedValues,
    
    // Swap logic
    onSubmit,
    calculateToAmount,
    
    // State
    isSwapping,
  };
};