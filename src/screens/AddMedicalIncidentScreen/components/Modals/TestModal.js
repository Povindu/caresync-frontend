import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import CustomDropdown from "../CustomDropdown";
import TestProviderDropDown from "../TestProviderDropDown";
import { baseUrl } from "../../../../constants/constants";

const TestModal = ({
  selectedStartDate,
  selectedOption,
  onClose,
  recordName,
  description,
}) => {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  const saveIncident = async () => {
    try {
      const res = await fetch(`${baseUrl}/medicalIncident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "test",
          recordName: recordName,
          recordDescription: description,
          incidentType: selectedOption,
          date: selectedStartDate,
          testType: selectedOption1,
          testProvider: selectedOption2,
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
      <Text style={styles.modalText}>Add Test Details</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Test Type:</Text>
        <View style={styles.dropdowncontainer}>
          <CustomDropdown
            selectedOption1={selectedOption1}
            setSelectedOption1={setSelectedOption1}
            options={[
              "Spirometry",
              "Arterial Blood Gas (ABG) Test",
              "Bronchoscopy",
              "Chest X-ray",
              "CT Scan",
              "Peak Expiratory Flow (PEF) Test",
              "Other",
            ]}
            placeholderText="Select from the list"
          />
        </View>
        <Text style={styles.label}>Test Provider:</Text>
        <View style={styles.dropdowncontainer}>
          <TestProviderDropDown
            selectedOption2={selectedOption2}
            setSelectedOption2={setSelectedOption2}
            options={["HOSPITAL", "LAB", "CLINIC", "Other"]}
            placeholderText="Select from the list"
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
    paddingTop: 40,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "4%",
  },
  dropdowncontainer: {
    marginVertical: "-5%",
  },
});

export default TestModal;
