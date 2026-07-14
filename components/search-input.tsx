import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { useTranslation } from "@/i18n";
import { useAppTheme } from "@/theme/useAppTheme";

interface SearchInputProps extends Omit<TextInputProps, "style"> {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}

export function SearchInput({
  containerStyle,
  inputStyle,
  placeholder,
  accessibilityLabel,
  testID,
  onFocus,
  onBlur,
  ...props
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { colors, typography } = useAppTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors, typography);

  return (
    <View
      style={[styles.container, isFocused && styles.focusedContainer, containerStyle]}
      testID={testID}
    >
      <MaterialIcons
        color={isFocused ? colors.primary : colors.secondary}
        name="search"
        size={20}
      />
      <TextInput
        accessibilityLabel={accessibilityLabel ?? t.common.search}
        autoCapitalize="none"
        autoCorrect={false}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholder={placeholder ?? t.common.searchPlaceholder}
        placeholderTextColor={colors.secondary}
        style={[styles.input, inputStyle]}
        testID={testID ? `${testID}-input` : undefined}
        {...props}
      />
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
      borderColor: colors.secondary,
      borderRadius: 14,
      borderWidth: 1,
      flexDirection: "row",
      gap: 10,
      minHeight: 48,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    focusedContainer: {
      borderColor: colors.primary,
    },
    input: {
      color: colors.primary,
      flex: 1,
      fontSize: typography.body.fontSize,
      paddingVertical: 0,
    },
  });
