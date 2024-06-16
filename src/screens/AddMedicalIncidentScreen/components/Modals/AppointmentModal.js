import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { baseUrl } from "../../../../constants/constants";
import { useNavigation } from "@react-navigation/native";

const AppointmentModal = ({
  selectedStartDate,
  selectedOption,
  onClose,
  recordName,
  description,
}) => {
  const [appointmentPurpose, setAppointmentPurpose] = useState("");
  const [healthProName, setHealthProName] = useState("");
  const [healthProContact, setHealthProContact] = useState("");

  const navigation = useNavigation(); // Get navigation object

  console.log(appointmentPurpose);
  console.log(healthProName);
  console.log(healthProContact);

  const saveAppointmentIncident = async () => {
    try {
      const res = await fetch(`${baseUrl}/medicalIncident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "appointment",
          recordName: recordName,
          recordDescription: description,
          incidentType: selectedOption,
          date: selectedStartDate,
          appointmentPurpose: appointmentPurpose,
          health_pro_name: healthProName,
          health_pro_contact: healthProContact,
        }),
      });

      console.log("Response status:", res.status);
      const responseData = await res.json(); // Parse response body as JSON

      if (!res.ok) {
        throw new Error(
          `Failed to save incident. Server response: ${JSON.stringify(
            responseData
          )}`
        );
      }

      console.log("Success:", responseData);
      navigation.navigate("DisplayMedicalRecords"); // Navigate to Display Medical Record page
    } catch (error) {
      console.error("Error saving incident:", error.message);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Appointment Details</Text>
      {/* <ScrollView style={styles.scrollview}> */}
      <View style={styles.contentContainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Purpose of the appoinment:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type the purpose "
            onChangeText={(text) => setAppointmentPurpose(text)}
          />
        </View>

        <Text style={styles.topic}>Helathcare provider's Details</Text>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Healthcare provider's name </Text>
          <TextInput
            style={styles.input}
            placeholder="Type Healthcare provider's name"
            onChangeText={(text) => setHealthProName(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Healthcare Center Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type the Healthcare Center Name "
            onChangeText={(text) => setHealthProContact(text)}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="OK"
            onPress={saveAppointmentIncident}
            color="#00567D"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "54%",
    position: "absolute",
    height: "75%",
    left: 0,
    right: 0,
    bottom: 10,
    marginLeft: "3%",
    alignContent: "center",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    width: "94%",
  },

  topic: {
    paddingTop: 30,
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: "800",
  },
  modalText: {
    fontSize: 23,
    fontWeight: "900",
    top: 0,
    position: "absolute",
    padding: 10,
    color: "#013d59",
  },
  contentContainer: {
    width: "100%",
    top: 6,
    position: "absolute",
    paddingTop: "6%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "92%",
    left: 30,
    // right: 15,
    top: 580,
  },
  buttonWrapper: {
    width: "40%", // Adjust as needed
  },
  label: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "8%",
  },
  inputcontainer: {
    marginVertical: "-16%",
    marginTop: 2,
  },

  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    width: "88%",
    height: 38,
    marginBottom: 40,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default AppointmentModal;
