import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import { baseUrl } from "../../../constants/constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log(baseUrl + "/signin");

      const response = await fetch(baseUrl + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Navigate to PatientDashboard if login successful
        await AsyncStorage.setItem("access-token", data.accessToken);
        await AsyncStorage.setItem("refresh-token", data.refreshToken);

        console.log("AT: " + (await AsyncStorage.getItem("access-token")));
        console.log("RT: " + (await AsyncStorage.getItem("refresh-token")));

        navigation.navigate("PatientDashboard");
      } else {
        Alert.alert("Login Failed", data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert(
        "Error",
        "An error occurred while logging in. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login Screen</Text>

      <Image
        source={require("../../../../assets/doc.png")}
        style={styles.docimg}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PatientRegister")}>
        <Text style={styles.linkText}>New here? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FEFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#00567D",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
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
  linkText: {
    color: "#00567D",
    marginTop: 10,
  },
});

export default PatientLogin;
