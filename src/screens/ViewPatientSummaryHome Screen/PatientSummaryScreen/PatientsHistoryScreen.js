import { Text, StyleSheet, FlatList, View } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { LIST1 } from "../Data/dummy2";
import PatientHistoryGrid from "../Components/PatientHistoryGrid";
import { useState, useEffect } from "react";
import axios from "axios";

function PatientsHistoryScreen() {
  const [patientsHistory, setPatientsHistory] = useState([]);

  useEffect(() => {
    fetchPatientsHistory();
  }, []);

  const fetchPatientsHistory = async () => {
    try {
      const response = await axios.get(
        "http://192.168.8.102:4001/api/patientsHistory"
      );
      console.log("Response from backend:", response.data);
      setPatientsHistory(response.data);
    } catch (error) {
      console.error("Error fetching patientsHistory:", error);
    }
  };
  function renderCategoryItem({ item }) {
    // function presshandler(){

    // }

    return (
      <View>
        <PatientHistoryGrid
          id={item.recordId}
          title={item.title}
          date={item.date}
          doctor={item.doctor}
          description={item.description}
          symptom={item.symptom}
          presId={item.presId}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CustomHeader title="Patient History" />
      <FlatList
        data={patientsHistory}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        style={{ flex: 1 }}
      />
    </View>
  );
}
export default PatientsHistoryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F7FF",
  },
});
