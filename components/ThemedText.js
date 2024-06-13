import { StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

/**
 *
 * @param {Object} props
 * @param {string|undefined} props.lightColor - device color mode
 * @param {string|undefined} props.darkColor - device color mode
 * @param {('default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'| 'mini' | 'miniLink' | 'error' | 'miniDescribe')} props.type
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "mini" ? styles.miniText : undefined,
        type === "miniLink" ? styles.miniLink : undefined,
        type === "error" ? styles.errorText : undefined,
        type === "miniDescribe" ? styles.miniDescribe : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  miniText: {
    fontSize: 13,
    lineHeight: 24,
  },
  miniLink: {
    fontSize: 13,
    lineHeight: 24,
    color: "#0a7ea4",
  },
  errorText: {
    fontSize: 13,
    lineHeight: 15,
    marginTop: 5,
    color: "red",
  },
  miniDescribe: {
    fontSize: 13,
    lineHeight: 15,
    color: "gray",
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
