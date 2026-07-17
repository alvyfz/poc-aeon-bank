import React from "react";
import { render } from "@testing-library/react-native";

import { EmptyState } from "@/components/empty-state";

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

describe("EmptyState", () => {
  it("renders title and description", () => {
    const { getByText } = render(
      <EmptyState description="123ABC" title="Transaction not found" />,
    );

    expect(getByText("Transaction not found")).toBeTruthy();
    expect(getByText("123ABC")).toBeTruthy();
  });

  it("does not render description when not provided", () => {
    const { queryByText } = render(<EmptyState title="No results" />);

    expect(queryByText("123ABC")).toBeNull();
  });
});

