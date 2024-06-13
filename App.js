import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainScreen from "./routes/MainSceen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
