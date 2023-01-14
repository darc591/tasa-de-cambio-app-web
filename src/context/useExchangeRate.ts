import { useContext } from "react";
import { isEmpty } from "lodash";
import { ExchangeRateContext } from "./ExchangeRateProvider";

export const useExchangeRate = () => {
  const context = useContext(ExchangeRateContext);

  if (isEmpty(context)) {
    throw new Error(
      "useExchangeRate must be used within a ExchangeRateProvider"
    );
  }

  return context;
};
