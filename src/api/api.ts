import axios from "axios";
import { BuscarTasaDeCambioParams } from "./api.types";

/**
 * OBTENER TASA DE CAMBIO
 */
const buscarTasaDeCambio = (params: BuscarTasaDeCambioParams) =>
  axios.get(
    `https://api.exchangerate.host/convert?from=${params.from}&to=${params.to}`
  );
/**
 * LISTAR ANUNCIOS DE COMPRA DE BITCOIN
 */
const listarAnunciosCompraBTC = (currency: string) =>
  axios.get(
    `https://cors-anywhere.herokuapp.com/https://localbitcoins.com/buy-bitcoins-online/${currency}/.json`
  );
/**
 * LISTAR ANUNCIOS DE VENTA DE BITCOIN
 */

const listarAnunciosVentaBTC = (currency: string) =>
  axios.get(
    `https://cors-anywhere.herokuapp.com/https://localbitcoins.com/sell-bitcoins-online/${currency}/.json`
  );

export const api = {
  buscarTasaDeCambio,
  listarAnunciosCompraBTC,
  listarAnunciosVentaBTC,
};
