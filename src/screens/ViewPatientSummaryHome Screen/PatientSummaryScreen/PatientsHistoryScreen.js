import { Text, StyleSheet, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../constants/constants";
import Header2 from "../Components/Header2";

function PatientsHistoryScreen() {
  const [patientsHistory, setPatientsHistory] = useState([]);

  useEffect(() => {
    fetchPatientsHistory();
  }, []);

  const fetchPatientsHistory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/medicalIncident`);
      console.log("Response from backend:", response.data);
      setPatientsHistory(response.data);
    } catch (error) {
      console.error("Error fetching patientsHistory:", error);
    }
  };
  function renderCategoryItem({ item }) {
    return (
      <View>
        <PatientHistoryGrid
          recordName={item.recordName}
          date={item.date}
          incidentType={item.incidentType}
          recordDescription={item.recordDescription}
          testType={item.testType}
        />
        {/* export data to PatientHistoryGrid page */}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header2 text="Patient History" />
      <FlatList
        data={patientsHistory}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        style={{ flex: 1 }}
      />
      {/* Flatlist to display the patients details */}
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
