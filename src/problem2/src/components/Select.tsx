import React from "react";
import ReactSelect from "react-select";
import type { Props as ReactSelectProps, GroupBase } from "react-select";

export interface OptionType {
  value: string;
  label: string;
  isDisabled?: boolean;
}

interface SelectProps
  extends Omit<
    ReactSelectProps<OptionType, boolean, GroupBase<OptionType>>,
    "styles"
  > {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

interface CurrencySelectProps
  extends Omit<
    ReactSelectProps<string, boolean, GroupBase<string>>,
    "styles" | "formatOptionLabel"
  > {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showSymbol?: boolean;
  /**
   * Custom label formatter for options, receives an OptionType.
   */
  formatOptionLabel?: (option: OptionType) => React.ReactNode;
  options: string[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  size = "md",
  fullWidth = true,
  placeholder = "Select an option...",
  isDisabled = false,
  isLoading = false,
  isClearable = true,
  isSearchable = true,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <ReactSelect
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        classNamePrefix="react-select"
        className={`${sizeClasses[size]} ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  error,
  size = "md",
  fullWidth = true,
  placeholder = "Select a currency...",
  isDisabled = false,
  isLoading = false,
  isClearable = true,
  isSearchable = true,
  showSymbol = true,
  formatOptionLabel,
  className = "",
  options,
  ...props
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const defaultFormatOptionLabel = (option: OptionType) => (
    <div className="flex items-center">
      {showSymbol && (
        <span className="text-gray-500 font-mono">
          <img
            src={`/tokens/${option.value}.svg`}
            alt={option.label}
            className="inline-block w-4 h-4"
          />
        </span>
      )}
      <div className="flex items-center">
        <span className="ml-2 text-gray-600">{option.label}</span>
      </div>
    </div>
  );

  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <ReactSelect
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        classNamePrefix="react-select"
        className={`${sizeClasses[size]} ${className}`}
        formatOptionLabel={formatOptionLabel || defaultFormatOptionLabel}
        options={options.map((item) => ({ value: item, label: item }))}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
