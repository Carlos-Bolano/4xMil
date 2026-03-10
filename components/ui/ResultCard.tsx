import { View, Text } from 'react-native';

interface ResultCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

export function ResultCard({ title, amount, icon, variant = 'default', className }: ResultCardProps) {
  const isPrimary = variant === 'primary';
  
  const containerStyle = isPrimary 
    ? "bg-primary/5 dark:bg-primary/10 border-primary/20 p-5" 
    : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 p-4";
    
  const amountStyle = isPrimary
    ? "text-primary text-xl font-extrabold"
    : "text-orange-600 dark:text-orange-400 text-lg font-bold";

  return (
    <View className={`flex-row items-center justify-between rounded-2xl border shadow-sm ${containerStyle} ${className}`}>
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className={`font-medium text-slate-900 dark:text-slate-100 ${isPrimary ? 'font-bold' : ''}`}>{title}</Text>
      </View>
      <Text className={amountStyle}>{amount}</Text>
    </View>
  );
}
