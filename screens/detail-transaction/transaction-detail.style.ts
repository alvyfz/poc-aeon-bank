import { useAppTheme } from "@/theme/useAppTheme";
import { StyleSheet } from "react-native";

const createTransactionDetailStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      padding: 16,
      gap: 14,
    },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 14,
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 14,
      gap: 6,
    },
    title: {
      color: colors.secondary,
      fontSize: typography.caption.fontSize,
      fontWeight: "700",
    },
    value: {
      color: colors.text,
      fontSize: typography.title.fontSize,
      fontWeight: "800",
    },
  });

export { createTransactionDetailStyles };
