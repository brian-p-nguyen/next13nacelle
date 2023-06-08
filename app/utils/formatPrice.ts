interface FormatPriceParams {
  price: number;
  locale?: string;
  currencyCode?: string;
}

export const formatPrice = ({
  price,
  locale = 'en-US',
  currencyCode = 'USD'
}: FormatPriceParams) => {
  return typeof price === 'number'
    ? Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode
      }).format(price ?? 0)
    : '';
};
