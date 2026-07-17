import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import { FilterGroup } from "@/components/filter-group";

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

describe("FilterGroup", () => {
  it("calls onChange with the selected option value", () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <FilterGroup
        onChange={handleChange}
        options={[
          { label: "All", value: "all" },
          { label: "Incoming", value: "incoming" },
        ]}
        value="all"
      />,
    );

    fireEvent.press(getByText("Incoming"));

    expect(handleChange).toHaveBeenCalledWith("incoming");
  });
});

