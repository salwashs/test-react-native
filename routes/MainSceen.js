import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import HomeScreen from "./HomeScreen/HomeScreen";
import FormScreen from "./HomeScreen/FormScreen";
import LoginScreen from "./AuthScreen/LoginScreen";
import RegisterScreen from "./AuthScreen/RegisterScreen";
import { USER_TOKEN } from "../constant/KeyStore";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function MainScreen() {
  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const tokenAdmin = SecureStore.getItem(USER_TOKEN);

    if (tokenAdmin) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggingIn || isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
