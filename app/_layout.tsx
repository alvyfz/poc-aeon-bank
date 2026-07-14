import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { HeaderLanguageSwitcher } from "@/components/header-language-switcher";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTranslation } from "@/i18n";
import { darkColors, lightColors } from "@/theme/colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const palette = colorScheme === "dark" ? darkColors : lightColors;
  const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...baseTheme,
        dark: colorScheme === "dark",
        colors: {
          ...baseTheme.colors,
          primary: palette.primary,
          background: palette.background,
          card: palette.surface,
          text: palette.text,
          border: palette.border,
          notification: palette.error,
        },
      }}
    >
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerStyle: { backgroundColor: palette.surface },
          headerTintColor: palette.text,
          headerRight: () => <HeaderLanguageSwitcher />,
          contentStyle: { backgroundColor: palette.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: t.navigation.transactions,
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            title: t.navigation.transactionDetail,
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
