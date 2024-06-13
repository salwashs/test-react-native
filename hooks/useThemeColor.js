import { useColorScheme } from "react-native";

import { Colors } from "../constant/Colors";

/**
 * Uses theme color based on device color theme mode
 *
 * @param {Object} props
 * @param {string|undefined} props.light
 * @param {string|undefined} props.dark
 * @param {('text'|'background')} colorName
 *
 * @return {string} - Color hex code
 */
export default function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
