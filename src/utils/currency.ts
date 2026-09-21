/**
 * Formats a numerical amount into a localized USD currency string.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculates discount percentage between original price and current price.
 */
export const calculateDiscountPercentage = (
  price: number,
  originalPrice?: number
): number | null => {
  if (!originalPrice || originalPrice <= price) {
    return null;
  }
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
