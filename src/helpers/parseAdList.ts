export const parseAdList = (rawData) => {
  const parsedData = rawData
    .map((ad) => {
      return {
        minAmount: Number(ad.data.min_amount ?? 0),
        maxAmount: Number(ad.data.max_amount ?? 0),
        price: Number(ad.data.temp_price ?? 0),
        bankNames: ad.data.bank_name,
        link: ad.actions.public_view,
      };
    })
    .slice(0, 15);
  return parsedData;
};
