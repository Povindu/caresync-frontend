import {
  Text,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

function ContactPatientData({
  name,
  textLineOne,
  textLineTwo,
  backgroundColor,
  color,
}) {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${textLineTwo}`);
  };
  const handleCallPress = () => {
    Linking.openURL(`tel:${textLineTwo}`);
  };
  const onPressAction =
    textLineOne === "Email Address"
      ? handleEmailPress
      : textLineOne === "Mobile Number"
      ? handleCallPress
      : null;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        <Icon name={name} size={30} color="black" />
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.textLineOne}>{textLineOne}</Text>
        <TouchableOpacity onPress={onPressAction}>
          <Text style={[styles.textLineTwo, { color }]}>{textLineTwo}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );
}
export default ContactPatientData;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginLeft: 12,
    paddingLeft: "3%",

    width: "93%",
    borderRadius: 15,
    marginBottom: 10,
  },
  textcontainer: {
    flexDirection: "column",

    marginLeft: 40,
    marginTop: 10,
  },

  textLineOne: {
    fontSize: 18,
    color: "grey",
  },
  textLineTwo: {
    fontSize: 16,
    marginTop: 5,
    color: "black",
  },
  horizontalLine: {
    borderBottomWidth: 1, // Change the width as needed
    borderBottomColor: "#ccc", // Change the color as needed
    marginVertical: 15, // Adjust vertical spacing as needed
    width: 230,
  },
  iconContainer: {
    marginTop: 8,
    flexDirection: "row",
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
