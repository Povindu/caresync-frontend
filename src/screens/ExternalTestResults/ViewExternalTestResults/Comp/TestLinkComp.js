import { Link } from "@react-navigation/native";
import { IconButton, MD3Colors } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Linking,
} from "react-native";

function DocCard({ navigation, item }) {
  // console.log("Link: ", item.link.toString());
  const name = `https:` + item.link.toString();

  const openUrl = () => {
    try {
      Linking.openURL(name);
    } catch {
      console.log("Error");
    }
  };

  // console.log("Name: ", name)
  function onPressHandler() {
    // navigation.navigate("GiveDocAccessScreen", { name, DocID, id });
  }

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.card}>
          <Pressable onPress={onPressHandler}>
            <Text onPress={openUrl} style={styles.cardIn}>
              Link: {item.TestName}
            </Text>
            <IconButton
            style={styles.icon}
              icon="delete"
              iconColor={MD3Colors.error50}
              size={30}
              onPress={() => console.log("Pressed")}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default DocCard;

const styles = StyleSheet.create({
  background: {
    // backgroundColor:'#00567D'
  },

  card: {
    width: 350,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  cardIn: {
    // backgroundColor: '#D9F8FF',
    height: 50,
    width: "85%",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 15,
    paddingTop:15,
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    // alignItems: "center",
    position: "absolute",
    right: 0,
  },
});
