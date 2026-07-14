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
      padding: 16,
    },
    filterScroller: {
      marginTop: 12,
      marginBottom: 14,
    },
    filterContent: {
      alignItems: "flex-start",
    },
    centeredState: {
      flex: 1,
      justifyContent: "center",
    },
    listContent: {
      gap: 10,
      paddingBottom: 12,
    },
    emptyState: {
      marginTop: 4,
    },
    sectionTitle: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 0.8,
      marginBottom: 12,
      marginTop: 6,
    },
    row: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 14,
      borderWidth: 1,
      flexDirection: "row",
      gap: 12,
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    rowPressed: {
      opacity: 0.85,
    },
    iconWrapper: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 999,
      height: 36,
      justifyContent: "center",
      width: 36,
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
    incomingIcon: {
      color: colors.success,
    },
    outgoingIcon: {
      color: colors.error,
    },
  });

export { createListTransactionStyles };
