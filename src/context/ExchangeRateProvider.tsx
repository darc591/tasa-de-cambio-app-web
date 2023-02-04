import { createContext, useEffect, useState } from "react";
import {
  ExchangeRateProviderTypes,
  FormatedAd,
  Rates,
  Result,
} from "./ExchangeRateProvider.types";
import { api } from "../api/api";
import { parseAdList } from "../helpers/parseAdList";
import { calculateResults } from "../helpers/calculateResults";
import { AxiosError } from "axios";

export const ExchangeRateContext = createContext(
  {} as ExchangeRateProviderTypes
);

export const ExchangeRateProvider = ({ children }: React.PropsWithChildren) => {
  const [USDrates, setUSDrates] = useState<Rates>();
  const [BRLads, setBRLads] = useState<FormatedAd[]>();
  const [VEDads, setVEDads] = useState<FormatedAd[]>();
  const [result, setResult] = useState<Result>(null);
  const [resultWithComisions, setResultWithComisions] = useState<Result>();
  const [loading, setLoading] = useState<boolean>(false);
  const [valorEnviado, setValorEnviado] = useState<number>();
  const [porcentaje, setPorcentaje] = useState<number>(10);
  const getRates = async () => {
    try {
      const response = await Promise.all([
        api.buscarTasaDeCambio({ from: "USD", to: "BRL" }),
        api.buscarTasaDeCambio({ from: "USD", to: "VES" }),
      ]);
      const _rates = {
        BRL: response[0].data.result,
        VES: response[1].data.result,
      };
      setUSDrates(_rates);
      return _rates;
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const getBRLads = async () => {
    try {
      const response = await api.listarAnunciosCompraBTC("BRL");
      const parsedList = parseAdList(response.data?.data?.ad_list);
      setBRLads(parsedList);
      return parsedList;
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const getVEDads = async () => {
    try {
      const response = await api.listarAnunciosVentaBTC("VED");
      const parsedList = parseAdList(response.data?.data?.ad_list);
      setVEDads(parsedList);
      return parsedList;
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const buscarTasa = async (valor?: number) => {
    try {
      setLoading(true);
      const parsedLists = await Promise.all([
        getBRLads(),
        getVEDads(),
        getRates(),
      ]);
      const result = calculateResults(
        parsedLists[0],
        parsedLists[1],
        valor,
        parsedLists[2]
      );
      const resultWithComision = calculateResults(
        parsedLists[0],
        parsedLists[1],
        valor,
        parsedLists[2],
        porcentaje
      );
      setValorEnviado(valor);
      setResult(result);
      setResultWithComisions(resultWithComision);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const editarTasa = (valor?: number) => {
    const result = calculateResults(BRLads, VEDads, valor, USDrates);
    const resultWithComision = calculateResults(
      BRLads,
      VEDads,
      valor,
      USDrates,
      porcentaje
    );
    setValorEnviado(valor);
    setResult(result);
    setResultWithComisions(resultWithComision);
  };

  const calcularOfrecerCambio = (
    brlAds: FormatedAd[],
    vedAds: FormatedAd[],
    valorEnviando: number = 100,
    usdRates: Rates,
    margen: number = 0
  ) => {
    const resultado = calculateResults(
      brlAds,
      vedAds,
      valorEnviando,
      usdRates,
      margen
    );
    setPorcentaje(margen);
    setResultWithComisions(resultado);
  };

  return (
    <ExchangeRateContext.Provider
      value={{
        USDrates,
        BRLads,
        VEDads,
        resultWithComisions,
        result,
        loading,
        valorEnviado,
        buscarTasa,
        editarTasa,
        calcularOfrecerCambio,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};
