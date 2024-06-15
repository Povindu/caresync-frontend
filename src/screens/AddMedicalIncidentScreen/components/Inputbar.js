import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";

const Inputbar = ({ text1, placeholder, onRecordNameChange }) => {
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <View style={styles.inputcontainer}>
      <Text style={styles.text1}>{text1}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChange={handleChange}
      ></TextInput>
    </View>
  );
};

export default Inputbar;

const styles = StyleSheet.create({
  inputcontainer: {
    // flex: 0.4,
    paddingTop: "6%",
    justifyContent: "center",
  },
  text1: {
    marginLeft: 28,
    fontWeight: "500",
    fontSize: 16,
    color: "#1e1e1e",
    // fontFamily: 'poppins regular,',
  },
  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    width: "88%",
    height: 38,
    margin: 20,
    marginLeft: 25,
    // marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});
