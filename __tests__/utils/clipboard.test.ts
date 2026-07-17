jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(),
}));

import * as Clipboard from "expo-clipboard";

import { copyToClipboard } from "@/utils/clipboard";

describe("copyToClipboard", () => {
  it("writes the provided value to the clipboard", async () => {
    await copyToClipboard("123ABC");

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith("123ABC");
  });
});

