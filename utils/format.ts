export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^\d.,]/g, "");
  if (cleaned.length === 0) return 0;

  const firstCommaIndex = cleaned.indexOf(",");
  if (firstCommaIndex !== -1) {
    const integerPartRaw = cleaned.slice(0, firstCommaIndex);
    const decimalPartRaw = cleaned.slice(firstCommaIndex + 1);

    const integerPart = integerPartRaw.replace(/\./g, "");
    const decimalPart = decimalPartRaw.replace(/[^\d]/g, "").slice(0, 2);

    const normalized = decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
    return parseFloat(normalized) || 0;
  }

  const integerOnly = cleaned.replace(/\./g, "");
  return parseFloat(integerOnly) || 0;
};
