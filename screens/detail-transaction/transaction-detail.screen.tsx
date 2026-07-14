import { AppButton } from "@/components/app-button";
import { useTranslation } from "@/i18n";
import { useAppTheme } from "@/theme/useAppTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useTransactionDetail } from "./transaction-detail.hook";
import { createTransactionDetailStyles } from "./transaction-detail.style";

function TransactionDetailScreen() {
  const { safeId } = useTransactionDetail();
  const { colors, typography } = useAppTheme();
  const { t } = useTranslation();
  const styles = createTransactionDetailStyles(colors, typography);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t.navigation.detail}</Text>
        <Text style={styles.value}>{safeId}</Text>
      </View>

      <AppButton
        label="Back"
        variant="outline"
        startContent={
          <MaterialIcons name="chevron-left" size={18} color={colors.primary} />
        }
        onPress={() => router.back()}
      />
    </View>
  );
}
export { TransactionDetailScreen };
