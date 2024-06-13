import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedTextInput } from "../../components/ThemedTextInput";
import AwesomeAlert from "react-native-awesome-alerts";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  fetchDistrict,
  fetchProvince,
  fetchRegency,
} from "../../redux/action/actionCustomer";
import {
  clearCacheDistrict,
  clearCacheRegency,
} from "../../redux/slices/customerSlice";
import { validateInputEmpty } from "../../utils/InputValidates";
import { CUSTOMER_DATA } from "../../constant/KeyStore";

let initialState = {
  name: "",
  province: "",
  regency: "",
  district: "",
};

export default function FormScreen({ route, navigation }) {
  const { id } = route.params;

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const provinceData = useSelector((state) => state.customer.province);
  const regencyData = useSelector((state) => state.customer.regency);
  const districtData = useSelector((state) => state.customer.district);
  const errorDispatch = useSelector((state) => state.customer.error);
  const isLoading = useSelector((state) => state.customer.isLoading);

  useEffect(() => {
    dispatch(fetchProvince());

    if (id !== "create") {
      dispatch(fetchRegency(route.params?.provinceId));
      dispatch(fetchDistrict(route.params?.regencyId));

      const combineProvince = `${route.params.provinceId}|${route.params.province}`;
      const combineRegency = `${route.params.regencyId}|${route.params.regency}`;
      const combineDistrict = `${route.params.districtId}|${route.params.district}`;

      const updatedForm = {
        name: route.params?.name,
        province: combineProvince,
        regency: combineRegency,
        district: combineDistrict,
      };

      setForm(updatedForm);
    }

    dispatch(clearCacheRegency());
    dispatch(clearCacheDistrict());
  }, [id]);

  const updateData = async (id, input) => {
    try {
      const data = await SecureStore.getItemAsync(CUSTOMER_DATA);

      if (data || data.length > 2) {
        let parseValue = JSON.parse(data);

        const findIndex = parseValue.findIndex((item) => item.id == id);

        if (findIndex === -1) throw new Error("Data not found");

        parseValue[findIndex] = { ...parseValue[findIndex], ...input };

        await SecureStore.setItemAsync(
          CUSTOMER_DATA,
          JSON.stringify(parseValue)
        );

        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("🚀 ~ updateData ~ error:", error);
    }
  };

  const submitHandler = async () => {
    let newError = {};

    for (const field in form) {
      if (!validateInputEmpty(form[field])) {
        if (field === "name") {
          newError.name = "nama tidak boleh kosong";
        }
        if (field === "province") {
          newError.province = "provinsi tidak boleh kosong";
        }
        if (field === "regency") {
          newError.regency = "kabupaten tidak boleh kosong";
        }
        if (field === "district") {
          newError.district = "kecamatan tidak boleh kosong";
        }
      }
    }

    setError(newError);

    if (Object.keys(newError).length < 1) {
      if (id === "create") {
        dispatch(createCustomer(form));
      } else {
        updateData(id, form);
      }
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 1500);

      navigation.navigate("Home");
    }
  };

  const provinceSeletedHandler = (value) => {
    if (value) {
      const separate = value.split("|");
      const provinceId = separate[0];
      setForm({ ...form, province: value });
      dispatch(fetchRegency(provinceId));
    }
  };

  const regencySeletedHandler = (value) => {
    if (value) {
      const separate = value.split("|");
      const regencyId = separate[0];
      dispatch(fetchDistrict(regencyId));
      setForm({ ...form, regency: value });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ThemedText style={styles.titleText} type="subtitle">
        {id !== "create" ? "Edit Data" : "Tambah Data"}
      </ThemedText>
      <View style={styles.inputGroup}>
        <View>
          <ThemedTextInput
            placeholder="Nama Kustomer"
            onChangeText={(text) => setForm({ ...form, name: text })}
            value={form.name}
            style={error && error?.name && styles.validateInput}
          />
          {error && error?.name && (
            <ThemedText type="error">{error?.name}</ThemedText>
          )}
        </View>

        <View>
          <ThemedText type="miniDescribe">Provinsi</ThemedText>
          <RNPickerSelect
            value={form.province}
            onValueChange={(value) => provinceSeletedHandler(value)}
            placeholder={{ label: "Pilih Provinsi" }}
            items={provinceData.map((item) => {
              return { label: item.name, value: `${item.id}|${item.name}` };
            })}
          />
          {error && error?.province && (
            <ThemedText type="error">{error?.province}</ThemedText>
          )}
        </View>

        <View>
          <ThemedText type="miniDescribe">Kabupaten</ThemedText>
          <RNPickerSelect
            value={form.regency}
            onValueChange={(value) => regencySeletedHandler(value)}
            placeholder={{ label: "Pilih Kabupaten" }}
            disabled={regencyData.length < 1}
            items={regencyData.map((item) => {
              return { label: item.name, value: `${item.id}|${item.name}` };
            })}
          />
          {error && error?.regency && (
            <ThemedText type="error">{error?.regency}</ThemedText>
          )}
        </View>

        <View>
          <ThemedText type="miniDescribe">Kecamatan</ThemedText>
          <RNPickerSelect
            value={form.district}
            onValueChange={(value) => setForm({ ...form, district: value })}
            placeholder={{ label: "Pilih Kecamatan" }}
            disabled={districtData.length < 1}
            items={districtData.map((item) => {
              return { label: item.name, value: `${item.id}|${item.name}` };
            })}
          />
          {error && error?.district && (
            <ThemedText type="error">{error?.district}</ThemedText>
          )}
        </View>

        <View style={styles.buttonGroup}>
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
              <Text style={styles.buttonContent}>Submit</Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? "#d40000ad" : "#d40000",
              },
            ]}
          >
            <Text style={styles.buttonContent}>Kembali</Text>
          </Pressable>
        </View>
      </View>
      <AwesomeAlert
        show={submitted}
        closeOnTouchOutside={true}
        customView={
          <Text>Berhasil {id === "create" ? "Masukkan" : "Update"} Data</Text>
        }
        closeOnHardwareBackPress={false}
      ></AwesomeAlert>
      {/* <AwesomeAlert
        show={errorAuth}
        closeOnTouchOutside={true}
        customView={<Text>{errorAuth}</Text>}
        closeOnHardwareBackPress={false}
      ></AwesomeAlert> */}
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
    flexShrink: 1,
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
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
  },
});
