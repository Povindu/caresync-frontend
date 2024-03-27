import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { baseUrl } from "../../../constants/constants";
import { z } from "zod";

const PatientRegister = ({ navigation }) => {
  const baseURL = baseUrl;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateDoctorRegistration = z.object({
    firstName: z
      .string()
      .min(1, "Enter correct name ")
      .regex(/^[a-zA-Z ]*$/, {
        message: "Cannot enter number or symbol for First name",
      }),
    lastName: z
      .string()
      .min(1, { message: "Enter correct last name" })
      .regex(/^[a-zA-Z ]*$/, {
        message: "Cannot enter number or symbol for Last name",
      }),
    email: z.string().email({ message: " Enter correct Email address" }),
    nic: z.string().min(8, { message: "Enter correct NIC number" }),
  });

  const handleRegister = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      nic: nic,
      email: email,
    };
    
    const result = validateDoctorRegistration.safeParse(data);

    try {
      if (
        !firstName ||
        !lastName ||
        !nic ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      if (!result.success) {
        Alert.alert("Error", result.error.errors[0].message);
        return;
      }
      console.log(baseURL + "/signup");
      const response = await fetch(baseURL + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          nic,
          email,
          password,
        }),
      });
      const data = await response;
      // console.log(data);

      if (response.ok) {
        // Handle successful registration here
        Alert.alert("Success", "Registration successful.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("PatientLogin"), // Navigate back to login page
          },
        ]);
      } else {
        // Handle registration error
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      console.log("Error registering:", error);
      Alert.alert(
        "Error",
        "An error occurred while registering. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Registration</Text>
      <Text style={styles.titleSub}>Welcome to CareSync</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="NIC"
        value={nic}
        onChangeText={setNic}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#00567D",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#30A8DE",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PatientRegister;
