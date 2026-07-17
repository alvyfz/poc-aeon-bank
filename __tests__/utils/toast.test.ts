describe("showToast", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("uses ToastAndroid on Android", () => {
    const alert = jest.fn();
    const show = jest.fn();

    jest.doMock("react-native", () => ({
      Alert: { alert },
      Platform: { OS: "android" },
      ToastAndroid: { show, SHORT: "SHORT" },
    }));

    jest.isolateModules(() => {
      const { showToast } = require("@/utils/toast");

      showToast("Copied");
    });

    expect(show).toHaveBeenCalledWith("Copied", "SHORT");
    expect(alert).not.toHaveBeenCalled();
  });

  it("falls back to Alert on non-Android platforms", () => {
    const alert = jest.fn();
    const show = jest.fn();

    jest.doMock("react-native", () => ({
      Alert: { alert },
      Platform: { OS: "ios" },
      ToastAndroid: { show, SHORT: "SHORT" },
    }));

    jest.isolateModules(() => {
      const { showToast } = require("@/utils/toast");

      showToast("Copied");
    });

    expect(alert).toHaveBeenCalledWith("Copied");
    expect(show).not.toHaveBeenCalled();
  });
});

