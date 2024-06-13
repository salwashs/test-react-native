import * as SecureStore from "expo-secure-store";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { USER_DATA, USER_TOKEN } from "../constant/KeyStore";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/action/actionAuth";

export default function DrawerContent() {
  const dispatch = useDispatch();
  const username = JSON.parse(SecureStore.getItem(USER_DATA));

  const logoutHandler = () => {
    dispatch(logoutAdmin());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ThemedText type="subtitle">
          {username.username.toUpperCase()}
        </ThemedText>
        <ThemedText style={{ textAlign: "center" }}>Admin</ThemedText>
      </View>
      <Pressable
        onPress={logoutHandler}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? "#d40000ad" : "#d40000",
          },
        ]}
      >
        <Text style={styles.buttonContent}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 50,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 40,
    borderRadius: 5,
  },
  buttonContent: {
    color: "#eff8ff",
  },
});
