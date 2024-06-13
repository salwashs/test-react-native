import { StyleSheet, TextInput } from "react-native";

export function ThemedTextInput({ style, ...rest }) {
  return (
    <TextInput
      autoCapitalize="none"
      style={[styles.inputText, style]}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  inputText: {
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 2,
    },
  },
});
