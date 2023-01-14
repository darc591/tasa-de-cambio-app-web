export const dinero = (region: string, moneda: string) =>
  new Intl.NumberFormat(region, {
    style: "currency",
    currency: moneda,
  });

export const porcentaje = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
