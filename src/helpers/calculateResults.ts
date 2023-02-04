import { FormatedAd, Rates } from "../context/ExchangeRateProvider.types";

export const calculateResults = (
  brlAds: FormatedAd[],
  vedAds: FormatedAd[],
  valorEnviando: number = 100,
  usdRates: Rates,
  margen: number = 0
) => {
  const bestBrlAd = brlAds[0];
  const bestVedAd = vedAds[0];
  const formatedMargim = margen / 100;
  const cantidadBTC =
    typeof margen === "number"
      ? valorEnviando / bestBrlAd.price -
        (valorEnviando / bestBrlAd.price) * formatedMargim
      : valorEnviando / bestBrlAd.price;

  const valorEnviandoUSD = Number((valorEnviando / usdRates.BRL).toFixed(2));

  const valorRecibiendoVED = Number((cantidadBTC * bestVedAd.price).toFixed(2));

  const valorRecibiendoUSD = Number(
    (valorRecibiendoVED / usdRates.VES).toFixed(2)
  );

  const tasa = Number((valorRecibiendoVED / valorEnviando).toFixed(2));

  const tasaInvertida = Number((valorEnviando / valorRecibiendoVED).toFixed(2));

  const variacion = Number((valorRecibiendoUSD - valorEnviandoUSD).toFixed(2));

  const variacionPorcentaje = Number(
    ((valorRecibiendoUSD / valorEnviandoUSD - 1) * 100).toFixed(2)
  );

  const comision = Number(
    (valorEnviando - cantidadBTC * bestBrlAd.price).toFixed(2)
  );

  return {
    valorEnviandoBRL: valorEnviando,
    valorEnviandoUSD,
    valorRecibiendoVED,
    valorRecibiendoUSD,
    variacion,
    variacionPorcentaje,
    tasa,
    tasaInvertida,
    comision,
  };
};
