import { z } from "zod";

export const swapSchema = z.object({
  fromAmount: z
    .number("From amount must be a number")
    .positive("From amount must be greater than 0"),
  fromCurrency: z.string().min(1, "From currency is required"),
  toAmount: z.string(),
  toCurrency: z.string().min(1, "To currency is required"),
});

export type SwapFormData = z.infer<typeof swapSchema>;
