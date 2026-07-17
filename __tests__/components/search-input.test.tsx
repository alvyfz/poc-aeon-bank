import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import { SearchInput } from "@/components/search-input";

jest.mock("@/hooks/use-app-theme", () => ({
  useAppTheme: () => ({
    colors: {
      primary: "#0f172a",
      secondary: "#3b82f6",
      background: "#eff4ff",
      surface: "#f8f9ff",
      text: "#0f172a",
      border: "#cbd5e1",
      success: "#10b981",
      error: "#ef4444",
    },
    colorScheme: "light",
    typography: {
      title: { fontSize: 28, fontWeight: "800" },
      subtitle: { fontSize: 15, lineHeight: 22 },
      body: { fontSize: 16 },
      caption: { fontSize: 13 },
    },
  }),
}));

jest.mock("@/i18n", () => ({
  useTranslation: () => ({
    language: "en",
    t: {
      common: {
        search: "Search",
        searchPlaceholder: "Search",
      },
    },
  }),
}));

describe("SearchInput", () => {
  it("uses the localized placeholder and accessibility label by default", () => {
    const { getByTestId } = render(
      <SearchInput onChangeText={jest.fn()} testID="search" value="" />,
    );

    const input = getByTestId("search-input");

    expect(input.props.placeholder).toBe("Search");
    expect(input.props.accessibilityLabel).toBe("Search");
  });

  it("calls onChangeText when the user types", () => {
    const handleChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchInput onChangeText={handleChangeText} testID="search" value="" />,
    );

    fireEvent.changeText(getByTestId("search-input"), "salary");

    expect(handleChangeText).toHaveBeenCalledWith("salary");
  });
});

