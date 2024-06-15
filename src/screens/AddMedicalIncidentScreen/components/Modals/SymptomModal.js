import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import PainRating from "../PainRating";
import SymptomTypeDropdown from "../SymptomTypeDropdown";
import { baseUrl } from "../../../../constants/constants";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import AppetiteRating from "../AppetiteRating";
import SymptomFrequencyDropdown from "../SymptomFrequencyDropdown";
import SymptomDurationDropdown from "../SymptomDurationDropdown";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SymptomModal = ({
  selectedStartDate,
  selectedOption,
  onClose,
  recordName,
  description,
}) => {
  const [selectedSymptomType, setSelectedSymptomType] = useState(null);
  const [selectedSymptomFrequency, setSelectedSymptomFrequency] =
    useState(null);
  const [symptomDescription, setSymptomDescription] = useState("");
  const [painRating, setPainRating] = useState(0);
  const [selectedSymptomDuration, setSelectedSymptomDuration] = useState(null);
  const [appetiteRating, setAppetiteRating] = useState(0);
  const [weight, setWeight] = useState("");

  const navigation = useNavigation(); // Get navigation object

  console.log(recordName);
  console.log(description);
  console.log(selectedOption);
  console.log(selectedStartDate);
  console.log(selectedSymptomType);
  console.log(symptomDescription);
  console.log(selectedSymptomFrequency);
  console.log(painRating);
  console.log(selectedSymptomDuration);
  console.log(appetiteRating);
  console.log(weight);

  const saveSymptomIncident = async () => {
    try {
      const res = await fetch(`${baseUrl}/medicalIncident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "symptom",
          recordName: recordName,
          recordDescription: description,
          incidentType: selectedOption,
          date: selectedStartDate,
          symptomType: selectedSymptomType,
          symptomFrequency: selectedSymptomFrequency,
          symptom_Description: symptomDescription,
          severity: painRating,
          SymptomDuration: selectedSymptomDuration,
          appetite: appetiteRating,
          weight: weight,
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
      console.error("Error saving symptom incident:", error.message);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Symptom Details</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.label}>Symptom Type:</Text>
        <View style={styles.dropdowncontainer}>
          <SymptomTypeDropdown
            options={["Cough", "Chest Pain", "Fever", "Wheeze", "Other"]}
            placeholderText="Select from the list"
            selectedSymptomType={selectedSymptomType}
            setSelectedSymptomType={setSelectedSymptomType}
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Symptom Description </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the description"
            onChangeText={(text) => setSymptomDescription(text)}
          />
        </View>
        <Text style={styles.label}>Frequency:</Text>

        <View style={styles.dropdowncontainer}>
          <SymptomFrequencyDropdown
            options={[
              "Single time a day",
              "Once in two days",
              "Once in a week",
              "Other",
            ]}
            placeholderText="Select from the list"
            selectedSymptomFrequency={selectedSymptomFrequency}
            setSelectedSymptomFrequency={setSelectedSymptomFrequency}
          />
        </View>
        <Text style={styles.label}>Severity: Out of 10</Text>
        <PainRating
          text="Pain level"
          icon="thermometer-half"
          painRating={painRating}
          setPainRating={setPainRating}
        />
        <Text style={styles.label}>Duration:</Text>
        <View style={styles.dropdowncontainer}>
          <SymptomDurationDropdown
            options={[
              "Immediate",
              "about 1,2 minutes",
              "more that 2 minutes",
              "about half of hour",
              "other",
            ]}
            placeholderText="Select from the list"
            selectedSymptomDuration={selectedSymptomDuration}
            setSelectedSymptomDuration={setSelectedSymptomDuration}
          />
        </View>
        <Text style={styles.label}>Appetite: Out of 10 </Text>
        <AppetiteRating
          appetiteRating={appetiteRating}
          setAppetiteRating={setAppetiteRating}
        />
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Weight </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight in kg s"
            onChangeText={(text) => setWeight(text)}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="OK" onPress={saveSymptomIncident} color="#00567D" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "55%",
    position: "absolute",
    height: "90%",
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
    fontSize: 23,
    fontWeight: "900",
    top: 0,
    position: "absolute",
    padding: 10,
    color: "#013d59",
  },
  contentContainer: {
    width: "100%",
    top: 2,
    position: "absolute",
    paddingTop: "6%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "92%",
    left: 30,
    top: 710,
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
    marginVertical: "-6%",
    marginTop: "1%",
  },
});

export default SymptomModal;
