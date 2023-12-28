import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DoctorRegister = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [medicalId, setMedicalId] = useState("");

  const handleRegister = () => {
    // For API call to register the doctor
    console.log("Registration details:", {
      firstName,
      lastName,
      nicNumber,
      username,
      password,
      confirmPassword,
      medicalId,
    });

    //This is for After successful registration, navigate to DoctorLogin screen
    navigation.navigate("DoctorLogin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Register Screen</Text>
      <Text style={styles.titleSub}>Welcome to CareSync</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="NIC Number"
        onChangeText={(text) => setNicNumber(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Medical ID"
        onChangeText={(text) => setMedicalId(text)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("DoctorLogin")}>
        <Text>Already have an account? Login</Text>
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
    marginBottom: 20,
  },
  titleSub: {
    fontSize: 15,
    color: "#3A3A3A",
    marginBottom: 40,
  },

  input: {
    height: 40,
    width: "80%",
    borderColor: "00567D",
    borderWidth: 1,
    marginBottom: 24,
    padding: 10,
  },
  registerButton: {
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
});

export default DoctorRegister;
