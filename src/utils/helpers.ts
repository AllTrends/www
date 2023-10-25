/**
 * Format price to display eg. 2.1535322 => 2.15
 */
export const formatPrice = (price: number) => {
  return price.toFixed(2);
};

/**
 * uses formatPrice but if the decimal is 0, it will remove it
 */
export const formatWholePrice = (price: number) => {
  const formattedPrice = formatPrice(price);
  return formattedPrice.endsWith(".00")
    ? formattedPrice.slice(0, -3)
    : formattedPrice;
};

/**
 * gets a mock for the position given the collateral x1.1
 */
export const getMockPosition = (collateral: string): string => {
  return Number(formatPrice(Number(collateral))) * 1.1 + "";
};
