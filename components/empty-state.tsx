import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";

import { useAppTheme } from "@/theme/use-app-theme";

interface EmptyStateProps {
  title: string;
  description?: string;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  style?: ViewStyle;
  testID?: string;
}

export function EmptyState({
  title,
  description,
  iconName = "search-off",
  style,
  testID,
}: EmptyStateProps) {
  const { colors, typography } = useAppTheme();
  const styles = createStyles(colors, typography);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.iconWrapper}>
        <MaterialIcons color={colors.primary} name={iconName} size={22} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 14,
      borderWidth: 1,
      justifyContent: "center",
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    iconWrapper: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 999,
      height: 44,
      justifyContent: "center",
      marginBottom: 12,
      width: 44,
    },
    title: {
      color: colors.text,
      fontSize: typography.body.fontSize,
      fontWeight: "700",
      textAlign: "center",
    },
    description: {
      color: colors.secondary,
      fontSize: typography.caption.fontSize,
      marginTop: 4,
      textAlign: "center",
    },
  });
