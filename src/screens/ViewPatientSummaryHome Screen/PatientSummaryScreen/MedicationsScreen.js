import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Calendar, Agenda } from "react-native-calendars";
import Header2 from "../../AddMedicalIncidentScreen/components/Header2";

const MedicationScreen = () => {
  const [medications, setMedications] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [medicalDetails, setMedicalDetails] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState({});
  const [medicationsModalVisible, setMedicationsModalVisible] = useState(false);
  const [medicationsForSelectedDay, setMedicationsForSelectedDay] = useState(
    []
  );
  const [markedDates, setMarkedDates] = useState({});

  // useEffect(() => {
  //   fetchMedications();
  // }, []);

  // const fetchMedications = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://192.168.8.104:8011/medications"
  //     );
  //     setMedications(response.data);
  //   } catch (error) {
  //     console.error("Error fetching medications:", error);
  //     // Handle error
  //   }
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so we add 1 and pad with '0' if needed
    const day = String(date.getDate()).padStart(2, "0"); // Pad with '0' if needed

    return `${year}-${month}-${day}`;
  };
  const fetchMedications = async () => {
    try {
      const response = await fetch("http://192.168.8.104:8011/medications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "65cde7c585ffe2b8d4a75878", // Replace with actual patient ID
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medications");
      }

      const medicationsData = await response.json(); // Parse response JSON

      const markedDatesData = {};
      medicationsData.forEach((item) => {
        markedDatesData[item.selectedDate] = {
          marked: true,
          selected: true,
          dotColor: "blue",
        };
      });

      // Update state with formatted medications data
      setMedications(medicationsData);
      setMarkedDates(markedDatesData);

      // Process medications data as needed
      const formattedMedications = medicationsData.map((item) => ({
        selectedDate: formatDate(item.selectedDate),
        medicalDetails: item.medicalDetails,
      }));

      // Update state with formatted medications data
      setMedications(formattedMedications);
    } catch (error) {
      console.error("Error fetching medications:", error);
      // Handle error (e.g., display error message)
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleDayPress = (day) => {
    console.log("Day pressed:", day);
    setSelectedDate(day.dateString);
  };

  // const handleAddMedication = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://192.168.8.104:8011/medications/add",
  //       {
  //         patientId,
  //         selectedDate,
  //         medicalDetails,
  //       }
  //     );
  //     console.log(response.data); // Assuming you want to log the response
  //     // After successfully adding medication, fetch updated medication data
  //     fetchMedications();
  //   } catch (error) {
  //     console.error("Error adding medication:", error);
  //     // Handle error
  //   }
  // };

  const saveMedication = async () => {
    try {
      // Make HTTP POST request to save medication
      console.log(
        "selectedDate:" + selectedDate + " medicalDetails:" + medicalDetails
      );
      const res = await fetch("http://192.168.8.104:8011/medications/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "65cde7c585ffe2b8d4a75878", // Replace with actual patient ID
          selectedDate: selectedDate,
          medicalDetails: medicalDetails,
        }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      setModalVisible(false);
      setMedicationsModalVisible(false);
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };
  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    const medicationsForDay = medications.filter(
      (medication) => medication.selectedDate === day.dateString
    );
    if (medicationsForDay.length > 0) {
      setMedicationsForSelectedDay(medicationsForDay);
      setMedicationsModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const renderMedicationsModal = () => {
    return (
      <Modal
        visible={medicationsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMedicationsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Medications for {selectedDate}:</Text>
            {medicationsForSelectedDay.map((medication, index) => (
              <Text key={`${medication.selectedDate}-${index}`}>
                {medication.medicalDetails}
              </Text>
            ))}

            <Text>Add Medication</Text>
            <TextInput
              placeholder="Selected Date"
              value={selectedDate}
              onChangeText={setSelectedDate}
              style={styles.input}
            />
            <TextInput
              placeholder="Medical Details"
              value={medicalDetails}
              onChangeText={setMedicalDetails}
              style={[styles.input, { height: 100 }]}
              multiline
            />

            <Button
              title="Close"
              onPress={() => setMedicationsModalVisible(false)}
            />
            <Button title="Save" onPress={saveMedication} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header2 text="Medications" />

      <Calendar
        markedDates={markedDates}
        dayComponent={({ date, state }) => {
          return (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    date.dateString === today ? "#D0F1FF" : "white",
                  height: 70,
                  width: 50,
                  borderRadius: 15,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleDatePress(date)}
              >
                <Text
                  style={{ color: state === "disabled" ? "gray" : "black" }}
                >
                  {date.day}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {renderMedicationsModal()}

      <View>
        <Text>Medications:</Text>
        {medications && medications.length > 0 ? (
          medications.map((medication, index) => (
            <Text key={`${medication.selectedDate}-${index}`}>
              {medication.selectedDate}
              {medication.medicalDetails}
            </Text>
          ))
        ) : (
          <Text>No medications found</Text>
        )}
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Add Medication</Text>
            <TextInput
              placeholder="Selected Date"
              value={selectedDate}
              onChangeText={setSelectedDate}
              style={styles.input}
            />
            <TextInput
              placeholder="Medical Details"
              value={medicalDetails}
              onChangeText={setMedicalDetails}
              style={[styles.input, { height: 100 }]}
              multiline
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={saveMedication} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MedicationScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
