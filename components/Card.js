import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Card({ deleteHandler, customerData, navigation }) {
  const { id, name, regency, province, district, date } = customerData;

  return (
    <View style={styles.item}>
      <View style={styles.contentSpace}>
        <ThemedText style={styles.title}>{name}</ThemedText>
        <View style={styles.gapSpace}>
          <View style={styles.miniContent}>
            <Ionicons name="location" color={"#adc8ff"} />
            <ThemedText
              type="mini"
              style={styles.content}
            >{`${regency}, ${province}`}</ThemedText>
          </View>
          <View style={styles.miniContent}>
            <Ionicons name="calendar" color={"#adc8ff"} />
            <ThemedText type="mini" style={styles.content}>
              {date}
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.contentSpace}>
        {id !== 1 && (
          <>
            <Pressable
              onPress={() => navigation.navigate("Form", customerData)}
            >
              <Ionicons name="create" size={20} color={"#3572EF"} />
            </Pressable>
            <Pressable onPress={() => deleteHandler(id)}>
              <Ionicons name="trash" size={20} color={"#3572EF"} />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    backgroundColor: "#c8efff",
    height: 120,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { color: "#3572EF", fontWeight: 700 },
  content: { color: "#7a7a7a", fontWeight: 500, lineHeight: 15 },
  contentSpace: { justifyContent: "space-between" },
  gapSpace: { gap: 8, width: "90%" },
  miniContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
