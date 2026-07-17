import { formatCurrency } from "@/utils/currency";

describe("formatCurrency", () => {
  it("formats positive amounts with a plus sign", () => {
    expect(formatCurrency(1500)).toBe("+ RM 1,500.00");
  });

  it("formats negative amounts with a minus sign", () => {
    expect(formatCurrency(-500)).toBe("- RM 500.00");
  });

  it("formats zero with two decimals", () => {
    expect(formatCurrency(0)).toBe("+ RM 0.00");
  });
});

