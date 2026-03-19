import { useCalculation } from "@/hooks/useCalculation";
import { formatCurrency } from "@/utils/format";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlassCard } from "../../components/ui/GlassCard";
import { InputField } from "../../components/ui/InputField";
import { ResultCard } from "../../components/ui/ResultCard";
import { useApp } from "../../context/AppContext";
import { HelloWave } from "../ui/hello-wave";
import { PrimaryButton } from "../ui/PrimaryButton";

export default function HomeScreen() {
  const router = useRouter();
  const { userName, t } = useApp();
  const {
    amountStr,
    tax,
    total,
    handleAmountChange,
    handleCalculate,
    handleShare,
    handleCopyTotal,
    canShowActions,
  } = useCalculation();

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
                {t("home.greeting", { name: userName || t("common.user") })} <HelloWave />
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 text-sm">{t("home.subtitle")}</Text>
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
                  {t("home.calculatorTitle")}
                </Text>
              </View>

              <View className="gap-4">
                <View>
                  <InputField
                    label={t("home.amountLabel")}
                    leftPrefix="$"
                    placeholder={t("home.amountPlaceholder")}
                    keyboardType="numeric"
                    value={amountStr}
                    onChangeText={handleAmountChange}
                  />
                </View>
                <PrimaryButton title={t("home.calculate")} onPress={handleCalculate} />
              </View>
            </View>
          </GlassCard>

          {/* Results Section */}
          {canShowActions ? (
            <View className="gap-4">
              <Text className="text-sm font-semibold uppercase tracking-wider text-slate-400 px-1">
                {t("home.resultsTitle")}
              </Text>

              <ResultCard
                title={t("home.taxAmountTitle")}
                amount={formatCurrency(tax)}
                icon={
                  <View className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <MaterialIcons name="receipt-long" size={20} color="#ea580c" />
                  </View>
                }
              />

              <ResultCard
                title={t("home.totalAmountTitle")}
                amount={formatCurrency(total)}
                variant="primary"
                icon={
                  <View className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <MaterialIcons name="account-balance-wallet" size={20} color="white" />
                  </View>
                }
              />

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleShare}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 shadow-lg shadow-primary/25"
                >
                  <MaterialIcons name="share" size={18} color="white" />
                  <Text className="text-white font-bold">{t("home.share")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCopyTotal}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 py-3 px-4 border border-slate-200 dark:border-slate-700"
                >
                  <MaterialIcons name="content-copy" size={18} color="#2e69ff" />
                  <Text className="text-primary font-bold">{t("home.copyTotal")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* Quick Info Card */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(information)/info")}
            className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 flex-row gap-3 items-start"
          >
            <MaterialIcons name="info" size={20} color="#94a3b8" style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t("home.quickInfo")}
              </Text>
              <Text className="text-[11px] font-semibold text-primary mt-2">{t("home.viewInfo")}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#94a3b8" style={{ marginTop: 1 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
