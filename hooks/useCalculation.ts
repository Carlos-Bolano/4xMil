import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Keyboard, Share } from "react-native";

import { useApp } from "@/context/AppContext";
import { formatCurrency, formatNumber, parseCurrency } from "@/utils/format";
import { formatAmountInput } from "@/utils/formatAmountInput";

export function useCalculation() {
  const { t, showToast } = useApp();
  const [amountStr, setAmountStr] = useState("");
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const amount = useMemo(() => parseCurrency(amountStr), [amountStr]);

  useEffect(() => {
    if (amountStr === "") {
      setTax(0);
      setTotal(0);
    }
  }, [amountStr]);

  const handleAmountChange = useCallback((text: string) => {
    setAmountStr(formatAmountInput(text));
  }, []);

  const handleCalculate = useCallback(() => {
    Keyboard.dismiss();

    if (amount <= 0) {
      Alert.alert(t("calc.invalidAmountTitle"), t("calc.invalidAmountMessage"));
      return;
    }

    const calculatedTax = (amount * 4) / 1000;
    const calculatedTotal = amount + calculatedTax;

    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [amount, t]);

  const handleShare = useCallback(async () => {
    try {
      const message = t("calc.shareMessage", {
        amount: formatCurrency(amount),
        tax: formatCurrency(tax),
        total: formatCurrency(total),
      });
      await Share.share({ message });
    } catch {
      Alert.alert(t("calc.shareErrorTitle"), t("calc.shareErrorMessage"));
    }
  }, [amount, tax, total, t]);

  const handleCopyTotal = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(formatNumber(total));
      showToast(t("calc.copiedMessage"));
    } catch {
      showToast(t("calc.copyErrorMessage"));
    }
  }, [showToast, t, total]);

  return {
    amountStr,
    tax,
    total,
    handleAmountChange,
    handleCalculate,
    handleShare,
    handleCopyTotal,
    canShowActions: tax > 0,
  };
}
