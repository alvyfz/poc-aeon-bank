import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

export interface FilterGroupOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface FilterGroupProps<TValue extends string> {
  options: FilterGroupOption<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export function FilterGroup<TValue extends string>({
  options,
  value,
  onChange,
  style,
  contentContainerStyle,
}: FilterGroupProps<TValue>) {
  const { colors, typography } = useAppTheme();
  const styles = createStyles(colors, typography);

  return (
    <View style={style}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <Pressable
              accessibilityLabel={option.label}
              accessibilityRole="button"
              key={option.value}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.selectedChip,
                pressed && styles.pressedChip,
              ]}
            >
              <Text style={[styles.label, isSelected && styles.selectedLabel]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    content: {
      gap: 8,
      paddingRight: 16,
    },
    chip: {
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 999,
      borderWidth: 1,
      justifyContent: "center",
      paddingHorizontal: 14,
      paddingVertical: 9,
    },
    selectedChip: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    pressedChip: {
      opacity: 0.85,
    },
    label: {
      color: colors.primary,
      fontSize: typography.caption.fontSize,
      fontWeight: "700",
      lineHeight: typography.caption.fontSize + 2,
    },
    selectedLabel: {
      color: colors.surface,
    },
  });
