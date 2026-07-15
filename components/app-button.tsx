import React, { type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverted"
  | "outline"
  | "ghost";

type ButtonSize = "regular" | "large";

interface AppButtonProps extends Omit<PressableProps, "style"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  startContent?: ReactNode;
  endContent?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  testID?: string;
}

export function AppButton({
  label,
  variant = "primary",
  size = "regular",
  style,
  textStyle,
  startContent,
  endContent,
  loading = false,
  fullWidth = false,
  disabled,
  accessibilityLabel,
  ...props
}: AppButtonProps) {
  const { colors, typography } = useAppTheme();
  const styles = createStyles(colors, typography);
  const isDisabled = disabled || loading;

  const contentColor = getContentColor(variant, colors);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        size === "large" && styles.large,
        fullWidth && styles.fullWidth,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      testID={props.testID ?? label}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <>
          {startContent}
          <Text
            style={[
              styles.label,
              size === "large" && styles.largeLabel,
              styles[`${variant}Label`],
              textStyle,
            ]}
          >
            {label}
          </Text>
          {endContent}
        </>
      )}
    </Pressable>
  );
}

const getContentColor = (
  variant: ButtonVariant,
  colors: ReturnType<typeof useAppTheme>["colors"],
) => {
  switch (variant) {
    case "secondary":
      return colors.surface;
    case "tertiary":
      return colors.background;
    case "inverted":
      return colors.primary;
    case "outline":
    case "ghost":
      return colors.primary;
    case "primary":
    default:
      return colors.surface;
  }
};

const createStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      alignSelf: "flex-start",
      borderRadius: 12,
      flexDirection: "row",
      gap: 8,
      justifyContent: "center",
      minHeight: 44,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    large: {
      minHeight: 52,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    fullWidth: {
      alignSelf: "stretch",
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    tertiary: {
      backgroundColor: colors.success,
    },
    inverted: {
      backgroundColor: colors.surface,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    disabled: {
      opacity: 0.55,
    },
    pressed: {
      opacity: 0.85,
    },
    label: {
      fontSize: typography.body.fontSize,
      fontWeight: "700",
    },
    largeLabel: {
      fontSize: 17,
    },
    primaryLabel: {
      color: colors.surface,
    },
    secondaryLabel: {
      color: colors.surface,
    },
    tertiaryLabel: {
      color: colors.background,
    },
    invertedLabel: {
      color: colors.primary,
    },
    outlineLabel: {
      color: colors.primary,
    },
    ghostLabel: {
      color: colors.primary,
    },
  });
