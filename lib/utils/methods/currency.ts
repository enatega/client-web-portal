export const formatNumber = (amount: number, locale: string = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumberWithCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
