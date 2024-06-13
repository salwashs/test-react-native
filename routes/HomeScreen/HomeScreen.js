import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import { Drawer } from "react-native-drawer-layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "../../components/ThemedText";
import Card from "../../components/Card";
import * as SecureStore from "expo-secure-store";
import { CUSTOMER_DATA } from "../../constant/KeyStore";
import DrawerContent from "../../components/DrawerContent";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dataState = useSelector((state) => state.customer.data);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [refreshing]);

  useEffect(() => {
    const dataStore = SecureStore.getItem(CUSTOMER_DATA);

    if (dataStore) {
      const dataCostumer = JSON.parse(dataStore);
      const filteredData = dataCostumer.filter((el) => el !== undefined);
      setData([...filteredData, ...dataState]);
    }
  }, [isDeleted, refreshing]);

  const deleteHandler = async (id) => {
    try {
      const data = await SecureStore.getItemAsync(CUSTOMER_DATA);

      if (data || data.length > 2) {
        let parseValue = JSON.parse(data);

        const filteredData = parseValue.filter((item) => item.id != id);

        if (!filteredData) throw new Error("Not found data");

        const strData = JSON.stringify(filteredData);

        await SecureStore.setItemAsync(CUSTOMER_DATA, strData);
        setIsDeleted(true);
      } else {
        throw new Error("Empty data");
      }
    } catch (error) {
      console.log("🚀 ~ deleteHandler ~ error:", error);
    } finally {
      setIsDeleted(false);
    }
  };

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}
    >
      <SafeAreaView style={styles.container}>
        <Pressable style={{ width: 28 }} onPress={() => setOpen(true)}>
          <Ionicons name="list" size={28} color={"#3572EF"} />
        </Pressable>

        <ThemedText type="title" style={styles.header}>
          List Kustomer
        </ThemedText>

        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Card
              deleteHandler={deleteHandler}
              customerData={item}
              navigation={navigation}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => navigation.navigate("Form", { id: "create" })}
            style={styles.buttonCreate}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="add-circle" color={"#3572EF"} size={50} />
              <Text style={styles.buttonText}>Tambah Kustomer</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 15 : 30,
    paddingHorizontal: 30,
    backgroundColor: "#f5f8ff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 35,
    zIndex: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  header: { marginTop: 20, marginBottom: 10, color: "#7a7a7a" },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  buttonCreate: {
    width: "fit-content",
    height: 50,
    borderRadius: 50,
    paddingLeft: 2,
    paddingRight: 15,
    backgroundColor: "#f5f8ff",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 2,
    },
  },
  buttonText: { color: "#3572EF", fontWeight: "700" },
});
