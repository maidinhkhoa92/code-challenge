import { CurrencySelect, Button, Textfield } from "./components";
import { useCurrencies } from "./services";
import { useSwap } from "./hooks/useSwap";
import { Controller } from "react-hook-form";

function App() {
  const { data: currencies, isLoading } = useCurrencies();
  const { control, handleSubmit, onSubmit, isSwapping, watchedValues } =
    useSwap();

  return (
    <div className="p-4 h-screen w-screen bg-gray-100 flex items-center">
      <div className="w-1/4 space-y-4 flex flex-col justify-center items-center m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* From Section */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">From</h3>
            <div className="flex flex-row gap-4">
              <Controller
                name="fromCurrency"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CurrencySelect
                    showSymbol
                    options={currencies || []}
                    isLoading={isLoading}
                    onChange={(option) => field.onChange(option?.value || "")}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="fromAmount"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textfield
                    placeholder="Enter amount"
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* To Section */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">From</h3>
            <div className="flex flex-row gap-4">
              <Controller
                name="toCurrency"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CurrencySelect
                    showSymbol
                    options={currencies || []}
                    isLoading={isLoading}
                    onChange={(option) => field.onChange(option?.value || "")}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="toAmount"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textfield
                    placeholder="Enter amount"
                    type="number"
                    step="0.01"
                    min="0"
                    disabled
                    value={field.value || ""}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            loading={isSwapping}
            disabled={
              isSwapping ||
              !watchedValues.fromAmount ||
              !watchedValues.fromCurrency ||
              !watchedValues.toCurrency
            }
          >
            {isSwapping ? "Swapping..." : "CONFIRM SWAP"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
