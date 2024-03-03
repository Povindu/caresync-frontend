import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Header2 from "../../AddMedicalIncidentScreen/components/Header2";

const MedicationScreen = () => {
  const [medications, setMedications] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [medicalDetails, setMedicalDetails] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [medicationsForSelectedDate, setMedicationsForSelectedDate] = useState(
    []
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

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
          patientId: "65cde7c585ffe2b8d4a75878",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medications");
      }

      const medicationsData = await response.json();

      const markedDatesData = {};
      const formattedMedications = medicationsData.map((item) => {
        const formattedDate = formatDate(item.selectedDate);
        markedDatesData[formattedDate] = {
          marked: true,
          selected: true,
          dots: [{ color: "blue" }],
        };
        return {
          selectedDate: formattedDate,
          medicalDetails: item.medicalDetails,
        };
      });

      setMedications(formattedMedications);
      setMarkedDates(markedDatesData);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const medicationsForDay = medications.filter(
      (medication) => medication.selectedDate === day.dateString
    );
    setMedicationsForSelectedDate(medicationsForDay);
    setModalVisible(true);
  };

  const saveMedication = async () => {
    try {
      const res = await fetch("http://192.168.8.104:8011/medications/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "65cde7c585ffe2b8d4a75878",
          selectedDate: selectedDate,
          medicalDetails: medicalDetails,
        }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      setModalVisible(false);
      fetchMedications(); // Refresh medications after adding a new one
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  const renderMedicationsModal = () => {
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Medications for {selectedDate}:
            </Text>
            <ScrollView style={styles.scrollContainer}>
              {medicationsForSelectedDate.map((medication, index) => (
                <Text
                  key={`${medication.selectedDate}-${index}`}
                  style={styles.medicationItem}
                >
                  {medication.medicalDetails}
                </Text>
              ))}
            </ScrollView>
            <Text>Add Medication</Text>
            <TextInput
              placeholder="Selected Date"
              value={selectedDate}
              onChangeText={setSelectedDate}
              style={styles.input}
              editable={false}
            />
            <TextInput
              placeholder="Medical Details"
              value={medicalDetails}
              onChangeText={setMedicalDetails}
              style={[styles.input, { height: 100 }]}
              multiline
            />

            <View style={styles.buttonContainer}>
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={saveMedication} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Header2 text="Medications" />

      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={styles.calendar}
      />

      <ScrollView style={styles.medicationsContainer}>
        <Text style={styles.medicationsTitle}>Medications:</Text>
        {medications && medications.length > 0 ? (
          medications.map((medication, index) => (
            <Text
              key={`${medication.selectedDate}-${index}`}
              style={styles.medicationItem}
            >
              {medication.selectedDate}: {medication.medicalDetails}
            </Text>
          ))
        ) : (
          <Text>No medications found</Text>
        )}
      </ScrollView>

      {renderMedicationsModal()}
    </View>
  );
};

export default MedicationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  medicationsContainer: {
    marginTop: 20,
    marginLeft: 20,
    maxHeight: 300,
    marginRight: 20,
    showVerticalScrollIndicator: true,
  },
  medicationsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  medicationsList: {
    marginBottom: 10,
    marginLeft: 10,
  },
  medicationItem: {
    marginBottom: 5,
  },
  scrollContainer: {
    maxHeight: 100, // Set max height for scrolling
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
  calendar: {
    marginBottom: 20,
  },
});
