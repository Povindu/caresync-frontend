import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { baseUrl } from "../../../../constants/constants";

const PrescriptionModal = ({
  selectedStartDate,
  selectedOption,
  onClose,
  recordName,
  description,
}) => {
  const navigation = useNavigation(); // Get navigation object
  const [presLink, setPresLink] = useState("");
  const [prescriptionNote, setPrescriptionNote] = useState("");

  const saveIncident = async () => {
    try {
      const res = await fetch(`${baseUrl}/medicalIncident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "prescription",
          recordName: recordName,
          recordDescription: description,
          incidentType: selectedOption,
          date: selectedStartDate,
          pres_note: prescriptionNote,
          link: presLink,
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
      <Text style={styles.modalText}>Add Prescription Details</Text>
      <View style={styles.contentContainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Precription Note:</Text>
          <TextInput
            style={styles.input}
            placeholder="max 30 characters"
            onChangeText={(text) => setPrescriptionNote(text)}
          />
        </View>
        <Text style={styles.label}>Upload the link</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter your prescription link"
            value={presLink}
            onChangeText={setPresLink}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="OK" onPress={saveIncident} color="#00567D" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
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
  modalText: {
    fontSize: 22,
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

    height: 38,
    marginBottom: 40,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default PrescriptionModal;
