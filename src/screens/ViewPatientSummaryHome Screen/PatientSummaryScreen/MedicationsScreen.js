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
import { baseUrl } from "../../../constants/constants";

import Header2 from "../../AddMedicalIncidentScreen/components/Header2";

const MedicationScreen = () => {
  const [medications, setMedications] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [medicalDetails, setMedicalDetails] = useState("");
  const [doctor, setDoctor] = useState("");
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

  const fetchMedications = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/medications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: id,
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
          patient: id,
          selectedDate: formattedDate,
          medicalDetails: item.medicalDetails,
          doctor: item.doctor,
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
  }, []); //fetching the medications details from the backend

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const medicationsForDay = medications.filter(
      (medication) => medication.selectedDate === day.dateString
    );
    setMedicationsForSelectedDate(medicationsForDay);
    setModalVisible(true);
  };

  const saveMedication = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/medications/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "65cde7c585ffe2b8d4a75878",

          selectedDate: selectedDate,
          medicalDetails: medicalDetails,
          doctor: doctor,
        }),
      }); //saving the medication details
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
        onRequestClose={() => setModalVisible(false)} //closing the medication details
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
                  <View
                    style={{
                      backgroundColor: "#FEFFE0",
                      marginBottom: 5,
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={styles.medicationItem1}>
                      {medication.medicalDetails}
                    </Text>
                    <Text style={styles.medicationItem1}>
                      By : Dr. {medication.doctor}
                    </Text>

                    <TouchableOpacity style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
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

            <Text style={styles.topics}>Name of Medicine</Text>
            <View style={styles.nameContainer}>
              <TextInput
                placeholder="Medicine"
                value={medicalDetails}
                onChangeText={setMedicalDetails}
                style={styles.textName}
              />
            </View>

            <Text style={styles.topics}>Doctor</Text>
            <View style={styles.nameContainer}>
              <TextInput
                placeholder="Doctor"
                value={doctor}
                onChangeText={setDoctor}
                style={styles.textName}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "#30A8DE",
                  padding: 10,
                  width: 70,
                  alignItems: "center",
                }}
                onPress={() => setModalVisible(false)} //closing the medication details
              >
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "#30A8DE",
                  padding: 10,
                  width: 70,
                  alignItems: "center",
                }}
                onPress={saveMedication} //saving the medication details
              >
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
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
        visible={viewCalender}
      />

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
          <View style={styles.medicationItemCon1}>
            <Text style={styles.medicationItem1}>
              {medication.medicalDetails}
            </Text>
          </View>
          <View style={styles.medicationItemCon2}>
            <Text style={styles.medicationItem2}>
              By : Dr.{medication.doctor}
            </Text>
          </View>
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
    marginLeft: 10,
    maxHeight: "90%",
    marginRight: 10,
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
  medicationItem1: {
    marginTop: 0,
    marginLeft: 10,
  },
  medicationItem2: {
    marginTop: 3,
    marginLeft: 15,
  },
  scrollContainer: {
    maxHeight: 100,
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
    borderRadius: 10,
    backgroundColor: "#30A8DE",
    padding: 2,
    width: 70,
    alignItems: "center",
    marginLeft: 100,
    marginTop: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  dateContainer: {
    flexDirection: "row",

    marginBottom: 10,
    marginLeft: 5,
  },
  day: {
    fontSize: 26,
    color: "white",
  },
  month: {
    fontSize: 12,
    marginTop: -5,
    color: "white",
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
    backgroundColor: "#026b9c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  medicationItemContainer: {
    marginBottom: 10,
  },
  calendarButton: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 16,
  },
  medicationItemCon1: {
    width: "95%",
    backgroundColor: "#E3FFFC",
    marginTop: "2%",
    marginLeft: "2%",
    padding: "1%",
  },
  topics: {
    marginTop: 10,
  },
  nameContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    paddingLeft: 10,
    width: 220,
    backgroundColor: "#b9ba99",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
