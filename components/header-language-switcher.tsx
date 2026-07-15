import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { useTranslation } from "@/i18n";
import { usePreferencesStore, type Language } from "@/store/preferences-store";

const LANGUAGES: Language[] = ["en", "ms"];

export function HeaderLanguageSwitcher() {
  const { colors, typography } = useAppTheme();
  const { t } = useTranslation();
  const language = usePreferencesStore((state) => state.language);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);
  const styles = createStyles(colors, typography);

  return (
    <View style={styles.container}>
      {LANGUAGES.map((item) => {
        const isActive = item === language;

        return (
          <Pressable
            accessibilityLabel={`${t.common.switchLanguageTo} ${item.toUpperCase()}`}
            accessibilityRole="button"
            key={item}
            onPress={() => setLanguage(item)}
            style={[styles.option, isActive && styles.activeOption]}
          >
            <Text
              style={[styles.optionLabel, isActive && styles.activeOptionLabel]}
            >
              {item.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof useAppTheme>["colors"],
  typography: ReturnType<typeof useAppTheme>["typography"],
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderRadius: 999,
      borderWidth: 1,
      flexDirection: "row",
      overflow: "hidden",
    },
    option: {
      minWidth: 42,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    activeOption: {
      backgroundColor: colors.primary,
    },
    optionLabel: {
      color: colors.primary,
      fontSize: typography.caption.fontSize,
      fontWeight: "700",
      textAlign: "center",
    },
    activeOptionLabel: {
      color: colors.surface,
    },
  });
