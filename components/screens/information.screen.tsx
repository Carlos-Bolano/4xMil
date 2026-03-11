import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import { GlassCard } from "../ui/GlassCard";
import { PrimaryButton } from "../ui/PrimaryButton";

export default function InformationScreen() {
  const router = useRouter();
  const { userName } = useApp();

  return (
    <SafeAreaView className="flex-1 bg-black/40">
      <Pressable className="flex-1" onPress={() => router.back()} />
      <View className="px-4 pb-6">
        <GlassCard className="rounded-3xl overflow-hidden">
          <View className="items-center pt-3">
            <View className="w-10 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
          </View>

          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                  <MaterialIcons name="account-balance" size={24} color="#2e69ff" />
                </View>
                <View>
                  <Text className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
                    Hola {userName || "User"}
                  </Text>
                  <Text className="text-slate-500 dark:text-slate-400 text-xs">Información del impuesto</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <MaterialIcons name="close" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <Text className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight mb-5">
              ¿Qué es el 4×1000 (GMF)?
            </Text>

            <View className="rounded-2xl bg-primary/15 border border-primary/10 overflow-hidden mb-4">
              <View className="h-44 items-center justify-center">
                <MaterialIcons name="account-balance" size={64} color="#94a3b8" />
              </View>
            </View>

            <View className="self-start rounded-full bg-primary/10 px-3 py-1 border border-primary/15 mb-3">
              <Text className="text-[10px] tracking-wider font-bold text-primary">IMPUESTO EN COLOMBIA</Text>
            </View>

            <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              Impuesto a Movimientos Financieros
            </Text>
            <Text className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              El 4×1000 (GMF) es un impuesto que se aplica a ciertas transacciones financieras en Colombia.
              Por cada $1.000 que se mueve, se cobran $4. Generalmente aplica a retiros y transferencias
              bancarias, con algunas exenciones.
            </Text>

            <PrimaryButton title="Calcular mi 4×1000" onPress={() => router.back()}>
              <MaterialIcons name="show-chart" size={18} color="white" />
            </PrimaryButton>

            <View className="mt-7 mb-3">
              <Text className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Detalles clave
              </Text>
            </View>

            <View className="gap-3">
              <GlassCard className="p-4 flex-row items-start gap-3">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center border border-primary/15">
                  <MaterialIcons name="bolt" size={20} color="#2e69ff" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Descuento automático
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Los bancos lo descuentan automáticamente al momento de la transacción.
                  </Text>
                </View>
              </GlassCard>

              <GlassCard className="p-4 flex-row items-start gap-3">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center border border-primary/15">
                  <MaterialIcons name="verified-user" size={20} color="#2e69ff" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">Cuenta exenta</Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Puedes marcar una cuenta para exención, con un tope mensual definido por norma.
                  </Text>
                </View>
              </GlassCard>

              <GlassCard className="p-4 flex-row items-start gap-3">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center border border-primary/15">
                  <MaterialIcons name="swap-horiz" size={20} color="#2e69ff" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Tipos de transacción
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Suele aplicar a transferencias, retiros y otros movimientos dentro del sistema financiero.
                  </Text>
                </View>
              </GlassCard>

              <GlassCard className="p-4 flex-row items-start gap-3">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center border border-primary/15">
                  <MaterialIcons name="history" size={20} color="#2e69ff" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">Origen</Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Nació en 1998 como una medida temporal (2×1000) y se mantuvo con ajustes.
                  </Text>
                </View>
              </GlassCard>
            </View>
          </ScrollView>
        </GlassCard>
      </View>
    </SafeAreaView>
  );
}
