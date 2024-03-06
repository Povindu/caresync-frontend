import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  const [viewCalender, setViewCalender] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchMedications = async () => {
    try {
      const response = await fetch("http://192.168.1.9:4000/medications", {
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
      const res = await fetch("http://192.168.1.9:4000/medications/add", {
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

  const removeMedication = async (selectedDate, medicalDetails) => {
    try {
      const res = await fetch("http://192.168.1.9:4000/medications/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "65cde7c585ffe2b8d4a75878",
          selectedDate,
          medicalDetails,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete medication");
      }
      // Refresh medication list after successful deletion
      fetchMedications();
    } catch (error) {
      console.error("Error deleting medication:", error);
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
                <View
                  key={`${medication.selectedDate}-${index}`}
                  style={styles.medicationItemContainer}
                >
                  <Text style={styles.medicationItem}>
                    {medication.medicalDetails}
                  </Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      removeMedication(
                        medication.selectedDate,
                        medication.medicalDetails
                      )
                    }
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
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
      {viewCalender && (
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          style={styles.calendar}
          visible={viewCalender}
        />
      )}
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: 40,
          width: "90%",
          borderRadius: 15,
          marginLeft: 20,
          marginTop: 8,
          marginBottom: 8,
          borderColor: "#00567D", // Border color for default
          borderWidth: 1, // Border width
        }}
        onPress={() => setViewCalender(!viewCalender)}
      >
        <Text style={styles.calendarButton}>Calendar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.medicationsContainer}>
        {medications && medications.length > 0 ? (
          Object.entries(
            medications
              .slice() // Create a copy of medications array to avoid mutating the original array
              .sort(
                (a, b) => new Date(a.selectedDate) - new Date(b.selectedDate)
              ) // Sort medications by selectedDate
              .reduce((acc, medication) => {
                const date = new Date(
                  medication.selectedDate
                ).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                });
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(medication);
                return acc;
              }, {})
          ).map(([date, medicationsForDate]) => (
            <View key={date} style={styles.dateContainer}>
              <View style={styles.subcon}>
                <Text style={styles.day}>{date.split(" ")[0]}</Text>
                <Text style={styles.month}>{date.split(" ")[1]}</Text>
              </View>

              {renderMedications(medicationsForDate)}
            </View>
          ))
        ) : (
          <Text>No medications found</Text>
        )}
      </ScrollView>

      {renderMedicationsModal()}
    </View>
  );
};

const renderMedications = (medicationsForDate) => {
  return (
    <View style={{ flexDirection: "column", width: "90%" }}>
      {medicationsForDate.map((medication, index) => (
        <View
          key={index}
          style={[
            styles.medicationDetailscon,
            {
              marginLeft: 20,
              backgroundColor: "white",
              width: "85%", // Adjust the width as needed to fit multiple medications in one row
              height: 60, // Set a fixed height for each medication item
              borderRadius: 10,
              marginBottom: 10, // Add margin between medication items
            },
          ]}
        >
          <Text style={styles.medicationItem}>{medication.medicalDetails}</Text>
        </View>
      ))}
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
    marginTop: 10,
    marginLeft: 20,
    maxHeight: "90%",
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
    marginTop: 10,
    marginLeft: 20,
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
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  dateContainer: {
    flexDirection: "row",

    marginBottom: 10,
  },
  day: {
    fontSize: 26,
  },
  month: {
    fontSize: 12,
    marginTop: -5,
  },
  medicationDetailscon: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: "white",
    width: "30%",
    height: "90%",
    borderRadius: 10,
  },
  medicationDetailstext: {
    fontSize: 26,
    padding: "3%",
  },
  subcon: {
    flexDirection: "column",
    width: 60,
    height: 60,
    backgroundColor: "#91e882",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  medicationItemContainer: {
    // Your existing styles for medicationItemContainer
    marginBottom: 10, // Add margin between medication items
  },
  calendarButton: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 16,
  },
});
