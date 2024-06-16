import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
const Header2 = ({ text }) => {
  return (
    <SafeAreaView>
      <View style={styles.headercontainer}>
        <Text style={styles.text}>{text}</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};
export default Header2;
const styles = StyleSheet.create({
  headercontainer: {
    // flex:1,
    backgroundColor: "#00567D",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 115,
    width: "100%",
  },
  text: {
    paddingTop: 50,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 24,
    // fontFamily: 'poppins medium',
  },
});
