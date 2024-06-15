import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import CustomDropdown from "../CustomDropdown";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { baseUrl } from "../../../../constants/constants";
import DosageDropdown from "../DosageDropdown";
import MedicationFrequencyDropdown from "../MedicationFrequencyDropdown";

const MedicationModal = ({
  selectedStartDate,
  selectedOption,
  onClose,
  recordName,
  description,
}) => {
  const [medicationName, setMedicationName] = useState("");
  const [selectedDosage, setSelectedDosage] = useState("");
  const [selectedMedicationFrequency, setSelectedMedicationFrequency] =
    useState("");

  const navigation = useNavigation(); // Get navigation object

  console.log(medicationName);
  console.log(selectedDosage);
  console.log(selectedMedicationFrequency);

  const saveMedicationIncident = async () => {
    try {
      const res = await fetch(`${baseUrl}/medicalIncident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "medication",
          recordName: recordName,
          recordDescription: description,
          incidentType: selectedOption,
          date: selectedStartDate,
          medi_name: medicationName,
          medi_dosage: selectedDosage,
          medi_Frequency: selectedMedicationFrequency,
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
      <Text style={styles.modalText}>Add Medication Details</Text>
      {/* <ScrollView style={styles.scrollview}> */}
      <View style={styles.contentContainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Name of the medication: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the medication Name"
            onChangeText={(text) => setMedicationName(text)}
          />
        </View>

        <Text style={styles.label}>Dosage:</Text>
        <View style={styles.dropdowncontainer}>
          <DosageDropdown
            options={["Half of a tablet", "One tablet", "Two tablets", "Other"]}
            placeholderText="Select from the list"
            selectedDosage={selectedDosage}
            setSelectedDosage={setSelectedDosage}
          />
        </View>
        <Text style={styles.label}>Frequency:</Text>
        <View style={styles.dropdowncontainer}>
          <MedicationFrequencyDropdown
            options={[
              "Single time a day",
              "Two times a day",
              "Three times a day",
              "Other",
            ]}
            placeholderText="Select from the list"
            selectedMedicationFrequency={selectedMedicationFrequency}
            setSelectedMedicationFrequency={setSelectedMedicationFrequency}
          />
        </View>
      </View>
      {/* </ScrollView> */}

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="OK" onPress={saveMedicationIncident} color="#00567D" />
        </View>
      </View>
    </View>
  );
};
export default MedicationModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "55%",
    position: "absolute",
    height: "85%",
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
    top: 665,
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
  dropdowncontainer: {
    marginLeft: "4%",
    paddingBottom: "10%",
    marginVertical: "-6%",
  },
});
