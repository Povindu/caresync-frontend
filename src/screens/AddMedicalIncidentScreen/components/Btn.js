import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Pressable,
  navigation,
  navigate,
  View,
  SafeAreaView,
} from "react-native";

const Btn = ({ navigation, text, screenName }) => {
  return (
    <Pressable style={styles.btn}>
      <Text style={styles.btntext}>{text}</Text>
    </Pressable>
  );
};
export default Btn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#00567D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    maxWidth: "100%",
    padding: 2,
  },
  btntext: {
    color: "#FFF",
    padding: 8,
    fontSize: 16,
  },
});
