export const displayINRCurrency = (num) => {
  const formtter = Intl.NumberFormat(`en-US`, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formtter.format(num)
};
