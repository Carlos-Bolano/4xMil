import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Keyboard, Share } from "react-native";

import { formatCurrency, parseCurrency } from "@/utils/format";
import { formatAmountInput } from "@/utils/formatAmountInput";

export function useCalculation() {
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
      Alert.alert("Invalid Amount", "Please enter a valid amount greater than 0.");
      return;
    }

    const calculatedTax = (amount * 4) / 1000;
    const calculatedTotal = amount + calculatedTax;

    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [amount]);

  const handleShare = useCallback(async () => {
    try {
      const message = `Hola! El cálculo de mi 4x1000 es: Monto: ${formatCurrency(amount)} | Impuesto: ${formatCurrency(tax)} | Total a transferir: ${formatCurrency(total)}. Calculado con 4xMil App.`;
      await Share.share({ message });
    } catch {
      Alert.alert("Error", "No se pudo abrir el menú de compartir.");
    }
  }, [amount, tax, total]);

  const handleCopyTotal = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(formatCurrency(total));
      Alert.alert("Copiado", "El total fue copiado al portapapeles.");
    } catch {
      Alert.alert("Error", "No se pudo copiar al portapapeles.");
    }
  }, [total]);

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
