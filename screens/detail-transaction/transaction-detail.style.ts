import { useAppTheme } from "@/theme/use-app-theme";
import { StyleSheet } from "react-native";

const createTransactionDetailStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "space-between",
      padding: 16,
    },
    centeredState: {
      flex: 1,
      justifyContent: "center",
    },
    content: {
      gap: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 18,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 28,
      gap: 24,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.04,
      shadowRadius: 16,
      elevation: 1,
    },
    summary: {
      alignItems: "center",
      gap: 12,
    },
    statusIconWrapper: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 999,
      height: 58,
      justifyContent: "center",
      width: 58,
    },
    summaryTitle: {
      color: colors.secondary,
      fontSize: typography.body.fontSize,
      fontWeight: "500",
      textAlign: "center",
    },
    summaryAmount: {
      fontSize: 28,
      lineHeight: 34,
      textAlign: "center",
    },
    divider: {
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    detailRow: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    detailLabel: {
      color: colors.secondary,
      flex: 1,
      fontSize: typography.body.fontSize,
      fontWeight: "500",
    },
    detailValueGroup: {
      alignItems: "flex-end",
      flex: 1,
      gap: 2,
    },
    detailValueRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      justifyContent: "flex-end",
    },
    detailValue: {
      color: colors.text,
      fontSize: typography.body.fontSize + 1,
      fontWeight: "700",
      textAlign: "right",
    },
    detailEndContent: {
      alignItems: "center",
      justifyContent: "center",
    },
    copyButton: {
      alignItems: "center",
      borderRadius: 10,
      justifyContent: "center",
      padding: 6,
    },
    copyButtonPressed: {
      backgroundColor: colors.background,
    },
    detailSecondaryValue: {
      color: colors.secondary,
      fontSize: typography.caption.fontSize,
      textAlign: "right",
    },
    buttonContainer: {
      marginTop: 20,
    },
  });

export { createTransactionDetailStyles };
