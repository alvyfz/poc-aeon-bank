import { AmountText } from "@/components/ammount-text";
import { AppButton } from "@/components/app-button";
import { EmptyState } from "@/components/empty-state";
import { useTranslation } from "@/i18n";
import { useAppTheme } from "@/theme/use-app-theme";
import type { Transaction } from "@/types/transactions.type";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useTransactionDetail } from "./transaction-detail.hook";
import { createTransactionDetailStyles } from "./transaction-detail.style";

function TransactionDetailScreen() {
  const { safeId, transaction } = useTransactionDetail();
  const { colors, typography } = useAppTheme();
  const { t } = useTranslation();
  const styles = createTransactionDetailStyles(colors, typography);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.title}>{t.navigation.detail}</Text>
          <Text style={styles.value}>{safeId}</Text>
        </View>

        {transaction ? (
          <>
            <DetailRow
              label="Transfer"
              value={transaction.transferName}
              styles={styles}
            />
            <DetailRow
              label="Recipient"
              value={transaction.recipientName}
              styles={styles}
            />
            <DetailRow
              label="Date"
              value={transaction.transferDate}
              styles={styles}
            />
            <View style={styles.section}>
              <Text style={styles.title}>Amount</Text>
              <AmountText amount={transaction.amount} size="large" />
            </View>
          </>
        ) : (
          <EmptyState
            description={safeId}
            iconName="error-outline"
            title={t.common.transactionNotFound}
          />
        )}
      </View>

      <AppButton
        label={t.common.back}
        variant="outline"
        startContent={
          <MaterialIcons name="chevron-left" size={18} color={colors.primary} />
        }
        onPress={() => router.back()}
      />
    </View>
  );
}

function DetailRow({
  label,
  value,
  styles,
}: {
  label: string;
  value:
    | Transaction["transferName"]
    | Transaction["recipientName"]
    | Transaction["transferDate"];
  styles: ReturnType<typeof createTransactionDetailStyles>;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.description}>{value}</Text>
    </View>
  );
}

export { TransactionDetailScreen };
