import { AmountText } from "@/components/amount-text";
import { AppButton } from "@/components/app-button";
import { EmptyState } from "@/components/empty-state";
import { useTranslation } from "@/i18n";
import { useAppTheme } from "@/theme/use-app-theme";
import { copyToClipboard } from "@/utils/clipboard";
import { formatCurrency } from "@/utils/currency";
import { buildShareMessage, shareContent } from "@/utils/share";
import { showToast } from "@/utils/toast";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { TransactionDetailRow } from "./transaction-detail-row";
import { useTransactionDetail } from "./transaction-detail.hook";
import { createTransactionDetailStyles } from "./transaction-detail.style";

function TransactionDetailScreen() {
  const { error, isLoading, retry, safeId, transaction, transactionDate } =
    useTransactionDetail();
  const { colors, typography } = useAppTheme();
  const { t } = useTranslation();
  const styles = createTransactionDetailStyles(colors, typography);

  async function handleCopyReferenceId() {
    await copyToClipboard(safeId);
    showToast(t.common.copiedToClipboard);
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centeredState]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          {transaction ? (
            <>
              <View style={styles.summary}>
                <View style={styles.statusIconWrapper}>
                  <MaterialIcons
                    color={colors.surface}
                    name="check"
                    size={28}
                  />
                </View>
                <Text style={styles.summaryTitle}>
                  {transaction.transferName}
                </Text>
                <AmountText
                  amount={transaction.amount}
                  size="large"
                  style={styles.summaryAmount}
                />
              </View>

              <View style={styles.divider} />

              <TransactionDetailRow
                label={t.detail.recipient}
                value={transaction.recipientName}
                styles={styles}
              />
              <TransactionDetailRow
                label={t.detail.date}
                secondaryValue={transactionDate?.time}
                value={transactionDate?.date ?? t.common.unknownDate}
                styles={styles}
              />
              <TransactionDetailRow
                label={t.detail.referenceId}
                value={safeId}
                endContent={
                  <Pressable
                    accessibilityLabel={t.detail.copyReferenceId}
                    accessibilityRole="button"
                    hitSlop={8}
                    onPress={() => void handleCopyReferenceId()}
                    style={({ pressed }) => [
                      styles.copyButton,
                      pressed ? styles.copyButtonPressed : null,
                    ]}
                  >
                    <MaterialIcons
                      color={colors.secondary}
                      name="content-copy"
                      size={18}
                    />
                  </Pressable>
                }
                styles={styles}
              />
            </>
          ) : (
            <EmptyState
              description={safeId}
              iconName="error-outline"
              title={
                error === "TRANSACTION_NOT_FOUND"
                  ? t.common.transactionNotFound
                  : t.common.somethingWentWrong
              }
            />
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {transaction ? (
          <AppButton
            fullWidth
            label={t.detail.shareReceipt}
            size="large"
            startContent={
              <MaterialIcons name="share" size={18} color={colors.surface} />
            }
            onPress={() =>
              void shareContent({
                message: buildShareMessage([
                  transaction.transferName,
                  transaction.recipientName,
                  transactionDate?.date ?? t.common.unknownDate,
                  safeId,
                  formatCurrency(transaction.amount),
                ]),
                title: t.detail.shareReceipt,
              })
            }
          />
        ) : (
          <AppButton label={t.common.tryAgain} onPress={() => void retry()} />
        )}
      </View>
    </View>
  );
}

export { TransactionDetailScreen };
