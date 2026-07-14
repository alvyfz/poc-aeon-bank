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
      padding: 16,
      gap: 14,
    },
    centeredState: {
      flex: 1,
      justifyContent: "center",
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
    section: {
      gap: 4,
    },
    value: {
      color: colors.text,
      fontSize: typography.title.fontSize,
      fontWeight: "800",
    },
    description: {
      color: colors.text,
      fontSize: typography.body.fontSize,
      fontWeight: "600",
    },
  });

export { createTransactionDetailStyles };
