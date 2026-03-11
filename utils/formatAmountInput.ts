export const formatAmountInput = (text: string) => {
  const cleaned = text.replace(/[^\d,]/g, "");
  if (cleaned.length === 0) return "";

  const firstCommaIndex = cleaned.indexOf(",");
  const integerRaw = firstCommaIndex === -1 ? cleaned : cleaned.slice(0, firstCommaIndex);
  const decimalRaw = firstCommaIndex === -1 ? "" : cleaned.slice(firstCommaIndex + 1);

  const integerDigits = integerRaw.replace(/^0+(?=\d)/, "");
  const groupedInteger = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (firstCommaIndex !== -1) {
    const decimals = decimalRaw.replace(/[^\d]/g, "").slice(0, 2);
    return decimals.length > 0 ? `${groupedInteger},${decimals}` : `${groupedInteger},`;
  }

  return groupedInteger;
};
