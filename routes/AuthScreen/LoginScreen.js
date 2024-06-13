import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedTextInput } from "../../components/ThemedTextInput";

import Ionicons from "@expo/vector-icons/Ionicons";
import { validateInputEmpty } from "../../utils/InputValidates";
import AwesomeAlert from "react-native-awesome-alerts";
import { useDispatch } from "react-redux";
import { fetchAdmin, loginAdmin } from "../../redux/action/actionAuth";

const initialForm = {
  usernameOrEmail: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [seePassword, setSeePassword] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async () => {
    let newError = {};
    for (const field in form) {
      if (validateInputEmpty(form[field]) === false) {
        if (field === "usernameOrEmail") {
          newError[field] = `username atau email tidak boleh kosong`;
        } else {
          newError[field] = `${field} tidak boleh kosong`;
        }
      }
    }

    const getAdmin = await dispatch(fetchAdmin());
    const adminsData = getAdmin.payload;

    if (
      adminsData.username !== form.usernameOrEmail &&
      adminsData.email !== form.usernameOrEmail
    ) {
      newError.usernameOrEmail = "username atau email salah";
    }

    if (adminsData.password !== form.password) {
      newError.password = "password salah";
    }

    setError(newError);

    if (Object.keys(newError).length < 1) {
      try {
        setSubmitted(true);

        setTimeout(() => {
          dispatch(loginAdmin({ token: form.usernameOrEmail }));
        }, 1500);
      } catch (error) {
        console.log("🚀 ~ submitHandler ~ error:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <AwesomeAlert
        show={submitted}
        closeOnTouchOutside={true}
        customView={<Text>Berhasil Login</Text>}
        closeOnHardwareBackPress={false}
      />

      <ThemedText style={styles.titleText} type="subtitle">
        Login
      </ThemedText>
      <View style={styles.inputGroup}>
        <View>
          <ThemedTextInput
            placeholder="Username atau Email"
            value={form.usernameOrEmail}
            onChangeText={(text) => setForm({ ...form, usernameOrEmail: text })}
            style={error && error?.usernameOrEmail && styles.validateInput}
          />
          {error && error?.usernameOrEmail && (
            <ThemedText type="error">{error?.usernameOrEmail}</ThemedText>
          )}
        </View>
        <View>
          <View style={styles.passwordInputGroup}>
            <ThemedTextInput
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              style={
                error && error?.password
                  ? [styles.passwordInput, styles.validateInput]
                  : styles.passwordInput
              }
              secureTextEntry={seePassword}
              placeholder="Password"
            />
            <Pressable onPress={() => setSeePassword(!seePassword)}>
              <Ionicons
                name={seePassword ? "eye" : "eye-off"}
                size={25}
                color="#11181C"
              />
            </Pressable>
          </View>
          {error && error?.password && (
            <ThemedText type="error">{error?.password}</ThemedText>
          )}
        </View>

        {/* +Need to move+ */}
        <Pressable
          onPress={submitHandler}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? "rgba(57, 189, 250, 0.549)"
                : "#3ABEF9",
            },
          ]}
        >
          <Text style={styles.buttonContent}>Sign In</Text>
        </Pressable>
        {/* -Need to move- */}
      </View>
      <ThemedText style={styles.miniText} type="mini">
        Tidak punya akun?{" "}
      </ThemedText>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <ThemedText type="miniLink">Daftar sekarang</ThemedText>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  titleText: {
    marginBottom: 20,
  },
  inputGroup: {
    gap: 30,
  },
  passwordInput: {
    flexShrink: 1,
  },
  passwordInputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderRadius: 5,
  },
  buttonContent: {
    color: "#eff8ff",
  },
  miniText: {
    marginTop: 12,
    textAlign: "center",
  },
  validateInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});
