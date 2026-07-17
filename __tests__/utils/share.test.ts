jest.mock("react-native", () => ({
  Share: {
    share: jest.fn(),
  },
}));

import { Share } from "react-native";

import { buildShareMessage, shareContent } from "@/utils/share";

describe("buildShareMessage", () => {
  it("joins valid lines and removes empty values", () => {
    expect(
      buildShareMessage([
        " Salary Payment ",
        null,
        undefined,
        " ",
        1500,
        "Ref: 123ABC",
      ]),
    ).toBe("Salary Payment\n1500\nRef: 123ABC");
  });
});

describe("shareContent", () => {
  it("forwards the payload to Share.share", async () => {
    await shareContent({
      message: "Receipt body",
      title: "Share Receipt",
    });

    expect(Share.share).toHaveBeenCalledWith({
      message: "Receipt body",
      title: "Share Receipt",
    });
  });
});

