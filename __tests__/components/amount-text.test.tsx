import React from "react";
import { render } from "@testing-library/react-native";

import { AmountText } from "@/components/amount-text";

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
        amount: "Amount",
      },
    },
  }),
}));

describe("AmountText", () => {
  it("renders formatted amount and accessibility label", () => {
    const { getByText, getByLabelText } = render(
      <AmountText amount={1500} testID="amount" />,
    );

    expect(getByText("+ RM 1,500.00")).toBeTruthy();
    expect(getByLabelText("Amount + RM 1,500.00")).toBeTruthy();
  });

  it("renders negative amount formatting", () => {
    const { getByText } = render(<AmountText amount={-500} />);

    expect(getByText("- RM 500.00")).toBeTruthy();
  });
});

