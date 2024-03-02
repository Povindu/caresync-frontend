import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import Header2 from "../../AddMedicalIncidentScreen/components/Header2";
import { Agenda } from "react-native-calendars";

const MedicationsScreen = () => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newlyAddedEvents, setNewlyAddedEvents] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [medications, setMedications] = useState({});

  const [medicalDetails, setMedicalDetails] = useState("");

  //////////////////////////////

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so we add 1 and pad with '0' if needed
    const day = String(date.getDate()).padStart(2, "0"); // Pad with '0' if needed

    return `${year}-${month}-${day}`;
  };

  const fetchMedications = async () => {
    try {
      // const response = await axios.get('http://192.168.75.160:8011/medications',{
      //     patientId: '65cde7c585ffe2b8d4a75878'
      // });

      const response = await fetch("http://192.168.75.160:8011/medications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "65cde7c585ffe2b8d4a75878", // Replace with actual patient ID
        }),
      });
      // Assuming the response data is an array of medications
      const responseJson = await response.json();

      const newData = responseJson.map((item) => {
        return {
          selectedDate: formatDate(item.selectedDate),
          medicalDetails: item.medicalDetails,
        };
      });

      const date = newData.map((item) => item.selectedDate);

      const uniqueDates = [...new Set(date)];

      const newItems = uniqueDates.map((date) => {
        // const specialDate=[];
        const data = newData.filter((item) => date === item.selectedDate);
        //  {
        //     if (date === item.selectedDate) {
        //         return item.medicalDetails
        //         // specialDate.push({name:item.medicalDetails})
        //     }
        // });

        return {
          [date]: data.map((item) => {
            return { name: item.medicalDetails };
          }),
        };
      });

      const medicationsObject = newItems.reduce((acc, curr) => {
        const date = Object.keys(curr)[0];
        acc[date] = curr[date];
        return acc;
      }, {});

      // Log the transformed object

      // setItems(medicationsObject);

      setMedications(medicationsObject);
      // console.log(newItems);

      // console.log(newData);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);
  //////////////////////////

  // Function to handle saving medication
  const saveMedication = async () => {
    try {
      // Make HTTP POST request to save medication
      console.log(
        "selectedDate:" + selectedDate + " medicalDetails:" + medicalDetails
      );
      const res = await fetch("http://192.168.75.160:8011/medications/add", {
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

      //   const response = await axios.post('http://192.168.10.160:8011/medications/add', {
      //     patientId: '214100', // Replace with actual patient ID
      //     selectedDate: selectedDate,
      //     medicalDetails: medicalDetails
      //   });
      //   console.log('Medication saved successfully:', response.data);
      // Close modal after saving medication
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  // const convertMedicationsToItems = (medications) => {
  //   const items = {};
  //   for (const date in medications) {
  //     items[date] = medications[date].map((item) => ({ name: item.name }));
  //   }
  //   return items;
  // };

  // useEffect(() => {
  //   setItems(convertMedicationsToItems(medications));
  // }, [medications]);

  //////////////////////////

  // Example of items data structure
  // const initialItems = {
  //   "2024-03-01": [{ name: "ruchith" }],
  //   "2024-03-12": [{ name: "cough" }, { name: "breath" }, { name: "dwdwd" }],
  //   "2024-03-03": [{ name: "breath" }],
  //   "2024-03-24": [], // Add an empty array for the date "2024-03-03"
  // };

  // const initialItems = {
  //   "2024-03-01": [{ name: "ruchith" }],
  //   // "2024-03-01": [{ name: "ruchith" }, { name: "Item 1 - Any Description" }],
  //   "2024-03-02": [{ name: "cough" }, { name: "breath" }, { name: "dwdwd" }],
  //   // "2024-03-13": [{ name: "Item 2 - Any Description" }],
  //   // "2024-03-03": [],
  // };
  // Function to load items for a specific day
  // const loadItems = (day) => {
  //   const selectedMonth = day.dateString.substring(0, 7); // Extracting year-month format
  //   // Fetch items for the selected month from the server or local storage
  //   // For now, using initialItems as an example
  //   setItems(medications);

  //   console.log("medications", medications);
  //   // setItems(initialItems);
  // };

  const loadItems = (day) => {
    setTimeout(() => {
      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = timeToString(time);

      //   if (!items[strTime]) {
      //     items[strTime] = [];

      //     const numItems = Math.floor(Math.random() * 3 + 1);
      //     for (let j = 0; j < numItems; j++) {
      //       items[strTime].push({
      //         name: "Item for " + strTime + " #" + j,
      //         height: Math.max(10, Math.floor(Math.random() * 150)),
      //         day: strTime,
      //       });
      //     }
      //   }
      // }
      // const newItems = {};
      // Object.keys(items).forEach((key) => {
      //   newItems[key] = items[key];
      // });
      setItems(medications);
    }, 1000);
  };
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  //   // Function to handle date press
  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  // Function to add event
  const addEvent = () => {
    if (selectedDate && patientId) {
      // Check if patientId is available
      const newEvent = { date: selectedDate, name: eventText };
      setNewlyAddedEvents([...newlyAddedEvents, newEvent]);
      const newItems = {
        ...items,
        [selectedDate]: [...(items[selectedDate] || []), { name: eventText }],
      };
      setItems(newItems);
      // Send the medication data to the backend
    }
    setEventText("");
    setModalVisible(false);
  };

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={{ marginVertical: 5, backgroundColor: "" }}>
  //       <View style={styles.tile}>
  //         <Text>Date: {item.selectedDate}</Text>
  //         <Text>Medical Details: {item.medicalDetails}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  const renderItem = (item, firstItemInDay) => {
    return (
      <View style={{ marginVertical: 5, backgroundColor: "" }}>
        {firstItemInDay && (
          <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
            {item.timestamp} {/* Display date */}
          </Text>
        )}
        <View style={styles.tile}>
          <Text>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header2 text="Medications" />
      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={"2024-03-01"}
          onDayPress={handleDatePress}
          renderItem={renderItem}
        />
        {/* <FlatList
          data={medications}
          keyExtractor={(item) => item.selectedDate}
          renderItem={renderItem}
        /> */}

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
    </View>
  );
};

export default MedicationsScreen;

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

  tile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    marginRight: "3%",
    padding: "5%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});
