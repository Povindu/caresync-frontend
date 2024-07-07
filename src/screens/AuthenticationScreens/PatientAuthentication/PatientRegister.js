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
import axios from "axios";
import api from "../../../Services/AuthService";

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

      
      if (password.length < 8) {
        Alert.alert("Error", "Password must be at least 6 characters long.");
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
      const response = axios
        .post(baseURL + "/signup", {
          firstName,
          lastName,
          nic,
          email,
          password,
        })
        .then((res) => {
          console.log("Response: ", res);
  
          Alert.alert("Success", "Registration successful.Please verify your email address ", [
            {
              text: "OK",
              onPress: () => navigation.navigate("OtpVerifyScreen",{ email }), // Navigate back to login page
            },
          ]);
        })
        .catch((err) => {
          console.log("Error registering:", err.response.data.error);
          Alert.alert("Error", err.response.data.error);
        });
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
