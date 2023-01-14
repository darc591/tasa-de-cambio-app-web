export type ExchangeRateProviderTypes = {
  USDrates: Rates;
  BRLads: FormatedAd[];
  VEDads: FormatedAd[];
  result: Result;
  resultWithComisions: Result;
  loading: boolean;
  buscarTasa: (valor?: number) => void;
  editarTasa: (valor?: number) => void;
  calcularOfrecerCambio: (
    brlAds: FormatedAd[],
    vedAds: FormatedAd[],
    valorEnviando: number,
    usdRates: Rates,
    margen: number
  ) => void;
};

export type Rates = {
  BRL: number;
  VES: number;
};

export type FormatedAd = {
  minAmount: number;
  maxAmount: number;
  price: number;
  bankNames: string;
  link: string;
};

export type Result = {
  valorEnviandoBRL: number;
  valorEnviandoUSD: number;
  valorRecibiendoVED: number;
  valorRecibiendoUSD: number;
  variacion: number;
  variacionPorcentaje: number;
  tasa: number;
  tasaInvertida: number;
  comision?: number;
};
