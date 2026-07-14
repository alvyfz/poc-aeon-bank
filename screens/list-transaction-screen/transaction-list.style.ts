import { useAppTheme } from "@/theme/use-app-theme";
import { StyleSheet } from "react-native";

const createListTransactionStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      gap: 14,
      padding: 16,
    },
    listContent: {
      gap: 10,
      paddingBottom: 12,
    },
    emptyState: {
      marginTop: 4,
    },
    row: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 14,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    rowPressed: {
      opacity: 0.85,
    },
    rowText: {
      flex: 1,
      gap: 2,
    },
    title: {
      color: colors.text,
      fontSize: typography.body.fontSize,
      fontWeight: "700",
    },
    subtitle: {
      color: colors.secondary,
      fontSize: typography.caption.fontSize,
    },
  });

export { createListTransactionStyles };
