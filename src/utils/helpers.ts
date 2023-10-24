/**
 * Format price to display eg. 2.1535322 => 2.15
 */
export const formatPrice = (price: number) => {
  return price.toFixed(2);
};
