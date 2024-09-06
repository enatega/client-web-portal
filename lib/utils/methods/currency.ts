export const formatCurrency = (amount: number, locale: string = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
};
