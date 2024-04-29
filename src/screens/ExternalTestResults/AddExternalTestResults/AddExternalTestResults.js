import React from "react";

import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";

import Header from "../../../components/Header";
import api from "../../../Services/AuthService";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function AddExternalTestResults() {
  const { user } = useAuthContext();
  console.log("User: ", user._id);

  const [link, setLink] = React.useState("");
  const [TestName, setTestName] = React.useState("");

 

  const SubmitResult = async () => {
    if (!link || !TestName) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const data = await api
      .post("/extTests/addLink", { name:TestName, link: link, patientID: user._id })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Alert.alert("Success", "Test result submitted successfully");
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header name={"Add Test Results"} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.text}>Enter your test result link</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Test Name"
            onChangeText={(text) => setTestName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Test result link"
            onChangeText={(text) => setLink(text)}
          />
          <Pressable style={styles.inputBtn}>
            <Text style={styles.buttonText} onPress={SubmitResult}>
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FEFF",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#00567D",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30,
  },
  inputBtn: {
    backgroundColor: "#30A8DE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  DatePickerView: {
    width: "60%",
    // marginBottom: 20,
  },
});
