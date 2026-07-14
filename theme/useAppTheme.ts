import { useColorScheme } from "react-native";

import { darkColors, lightColors } from "@/theme/colors";
import { typography } from "@/theme/typography";

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkColors : lightColors;

  return {
    colors,
    colorScheme: colorScheme === "dark" ? "dark" : "light",
    typography,
  };
}
