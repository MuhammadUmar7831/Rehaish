export const suffixFormater = (num) => {
  const formatterUrdu = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "long",
  });

  const formatterEnglish = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "long",
  });

  const formattedUrdu = formatterUrdu.format(num);
  const formattedEnglish = formatterEnglish.format(num);

  return formattedEnglish + " (" + formattedUrdu + ")";
};
