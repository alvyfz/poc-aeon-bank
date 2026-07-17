jest.mock("@expo/vector-icons/MaterialIcons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return function MockMaterialIcons({
    name,
  }: {
    name?: string;
  }) {
    return React.createElement(Text, { testID: `icon-${name}` }, name);
  };
});

