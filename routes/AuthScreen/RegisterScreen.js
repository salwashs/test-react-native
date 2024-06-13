import * as SecureStore from "expo-secure-store";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedTextInput } from "../../components/ThemedTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  validateEmail,
  validateInputEmpty,
  validatePassword,
} from "../../utils/InputValidates";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../redux/action/actionAuth";
import AwesomeAlert from "react-native-awesome-alerts";

const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorAuth = useSelector((state) => state.auth.error);

  const [seePassword, setSeePassword] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async () => {
    let newError = {};
    for (const field in form) {
      if (field === "email" && validateEmail(form[field]) === false) {
        newError.email = "masukkan format email yang benar";
      }
      if (field === "password") {
        const validate = validatePassword(form[field]);
        validate !== true && (newError.password = validate);
      }
      if (
        field === "confirmPassword" &&
        form.password !== form.confirmPassword
      ) {
        newError.confirmPassword = "password tidak sama";
      }
      if (validateInputEmpty(form[field]) === false) {
        if (field === "confirmPassword") {
          newError[field] = `masukkan lagi password`;
        } else {
          newError[field] = `${field} tidak boleh kosong`;
        }
      }
    }
    setError(newError);

    if (Object.keys(newError) < 1) {
      try {
        dispatch(
          createAdmin({
            username: form.username,
            email: form.email,
            password: form.password,
          })
        );
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 2000);

        setTimeout(() => {
          navigation.navigate("Login");

          setForm(initialForm);
        }, 2200);
      } catch (error) {
        console.log("🚀 ~ submitHandler ~ error:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ThemedText style={styles.titleText} type="subtitle">
        Registrasi
      </ThemedText>
      <View style={styles.inputGroup}>
        <View>
          <ThemedTextInput
            placeholder="Username"
            onChangeText={(text) => setForm({ ...form, username: text })}
            value={form.username}
            style={error && error?.username && styles.validateInput}
          />
          {error && error?.username && (
            <ThemedText type="error">{error?.username}</ThemedText>
          )}
        </View>
        <View>
          <ThemedTextInput
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(text) => setForm({ ...form, email: text })}
            value={form.email}
            style={error && error?.email && styles.validateInput}
          />
          {error && error?.email && (
            <ThemedText type="error">{error?.email}</ThemedText>
          )}
        </View>
        {/* +Need to move+ */}
        <View>
          <View style={styles.passwordInputGroup}>
            <ThemedTextInput
              onChangeText={(text) => setForm({ ...form, password: text })}
              value={form.password}
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
          {error && error?.password ? (
            <ThemedText type="error">{error?.password}</ThemedText>
          ) : (
            <ThemedText type="miniDescribe">
              password harus terdiri dari angka, huruf kapital, dan karakter
              unik {"(ex. ?!@#$%^&*()/<>)"}
            </ThemedText>
          )}
        </View>

        <View>
          <View style={styles.passwordInputGroup}>
            <ThemedTextInput
              secureTextEntry={seePassword}
              placeholder="Konfirmasi Password"
              value={form.confirmPassword}
              onChangeText={(text) =>
                setForm({ ...form, confirmPassword: text })
              }
              style={
                error && error?.confirmPassword
                  ? [styles.passwordInput, styles.validateInput]
                  : styles.passwordInput
              }
            />
            <Pressable onPress={() => setSeePassword(!seePassword)}>
              <Ionicons
                name={seePassword ? "eye" : "eye-off"}
                size={25}
                color="#11181C"
              />
            </Pressable>
          </View>
          {error && error?.confirmPassword && (
            <ThemedText type="error">{error?.confirmPassword}</ThemedText>
          )}
        </View>
        {/* -Need to move- */}

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
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonContent}>Sign Up</Text>
          )}
        </Pressable>
        {/* -Need to move- */}
      </View>
      <ThemedText style={styles.miniText} type="mini">
        Sudah punya akun?{" "}
      </ThemedText>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <ThemedText type="miniLink">Login sekarang</ThemedText>
      </Pressable>

      <AwesomeAlert
        show={submitted}
        closeOnTouchOutside={true}
        customView={<Text>Berhasil Daftar</Text>}
        closeOnHardwareBackPress={false}
      ></AwesomeAlert>
      <AwesomeAlert
        show={errorAuth}
        closeOnTouchOutside={true}
        customView={<Text>{errorAuth}</Text>}
        closeOnHardwareBackPress={false}
      ></AwesomeAlert>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingTop: 50,
  },
  titleText: {
    marginBottom: 20,
  },
  validateInput: {
    borderColor: "red",
    borderWidth: 1,
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
});
