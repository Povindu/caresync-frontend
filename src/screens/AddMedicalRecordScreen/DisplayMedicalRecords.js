import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "../../components/Header";
import MedicalRecordGrid from "../AddMedicalIncidentScreen/components/MedicalRecordGrid";
import { baseUrl } from "../../constants/constants";
import axios from "axios";

function DisplayMedicalRecords({ navigation }) {
  const handleAddNew = () => {
    navigation.navigate("NewMedicalRecordScreen");
  };
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
        <MedicalRecordGrid
          recordName={item.recordName}
          // date={item.date}
          // incidentType={item.incidentType}
          recordDescription={item.recordDescription}
          incidents={item.incident}
          // testType={item.testType}
          // selectedOption2={item.selectedOption2}
        />
        {/* export data to PatientHistoryGrid page */}
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Header name="Past Medical Records" />
      <View style={styles.background}>
        <View style={styles.container}>
          <FlatList
            data={patientsHistory}
            keyExtractor={(item) => item._id}
            renderItem={renderCategoryItem}
          />
          <View style={styles.btn}>
            <Pressable onPress={handleAddNew}>
              <Text style={styles.btntext}>Add New</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default DisplayMedicalRecords;

const styles = StyleSheet.create({
  btn: {
    margin: "2%",
    backgroundColor: "#00567D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    maxWidth: "100%",
    padding: 2,
  },
  btntext: {
    color: "#FFF",
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "column",
    width: "100%",
    height: "77%",
    backgroundColor: "#FFFF",
  },
  background: {
    backgroundColor: "#DEFFFB",
    width: "100%",
    height: "100%",
    padding: 15,
  },
});
