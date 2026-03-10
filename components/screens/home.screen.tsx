import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Keyboard, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlassCard } from "../../components/ui/GlassCard";
import { InputField } from "../../components/ui/InputField";
import { ResultCard } from "../../components/ui/ResultCard";
import { useApp } from "../../context/AppContext";
import { formatCurrency, parseCurrency } from "../../utils/format";
import { PresstoButton } from "../ui/PresstoButton";

export default function HomeScreen() {
  const router = useRouter();
  const { userName } = useApp();
  const [amountStr, setAmountStr] = useState("");
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCalculate = () => {
    Keyboard.dismiss();
    const amount = parseCurrency(amountStr);

    if (amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount greater than 0.");
      return;
    }

    // 4x1000 calculation: (Amount * 4) / 1000
    const calculatedTax = (amount * 4) / 1000;
    const calculatedTotal = amount + calculatedTax;

    setTax(calculatedTax);
    setTotal(calculatedTotal);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
              <MaterialIcons name="person" size={24} color="#2e69ff" />
            </View>
            <View>
              <Text className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100">
                Hello {userName || "User"} 👋
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 text-sm">Calculate your 4×1000 easily</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(settings)")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <MaterialIcons name="settings" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 gap-6">
          {/* Glassmorphism Calculator Card */}
          <GlassCard className="rounded-2xl p-6 shadow-xl relative overflow-hidden ">
            <View
              className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full"
              style={{ opacity: 0.5 }}
            />

            <View className="relative z-10">
              <View className="flex-row items-center gap-2 mb-6">
                <View className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <MaterialIcons name="calculate" size={16} color="white" />
                </View>
                <Text className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  4×1000 Calculator
                </Text>
              </View>

              <View className="gap-4">
                <View>
                  <InputField
                    label="Amount to transfer"
                    leftPrefix="$"
                    placeholder="500,000"
                    keyboardType="numeric"
                    value={amountStr}
                    onChangeText={setAmountStr}
                  />
                </View>
                {/* <PrimaryButton title="Calculate" onPress={handleCalculate} /> */}
                <PresstoButton title="Calculate" onPress={handleCalculate} />
              </View>
            </View>
          </GlassCard>

          {/* Results Section */}
          <View className="gap-4">
            <Text className="text-sm font-semibold uppercase tracking-wider text-slate-400 px-1">
              Calculation Results
            </Text>

            <ResultCard
              title="Tax Amount (4×1000)"
              amount={formatCurrency(tax)}
              icon={
                <View className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <MaterialIcons name="receipt-long" size={20} color="#ea580c" />
                </View>
              }
            />

            <ResultCard
              title="Total Amount"
              amount={formatCurrency(total)}
              variant="primary"
              icon={
                <View className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MaterialIcons name="account-balance-wallet" size={20} color="white" />
                </View>
              }
            />
          </View>

          {/* Quick Info Card */}
          <View className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 flex-row gap-3 items-start">
            <MaterialIcons name="info" size={20} color="#94a3b8" style={{ marginTop: 2 }} />
            <Text className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
              The GMF (Gravamen a los Movimientos Financieros) is a national tax applied to financial
              transactions. The current rate is 4 per 1,000 pesos.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
