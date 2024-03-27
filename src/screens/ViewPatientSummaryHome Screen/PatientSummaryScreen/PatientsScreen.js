import { useState, useEffect } from "react";
import { FlatList, View, ScrollView, Text } from "react-native";
import { LIST } from "../Data/dummy-data";
import PatientGridTile from "../Components/PatientGridTile";
import Search from "../Components/Search";
import CustomHeader from "../Components/CustomHeader";
import axios from "axios";

import { baseUrl } from "../../../constants/constants";

function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${baseUrl}/patients`);

      setPatients(response.data);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  function renderCategoryItem({ item }) {
    function presshandler() {
      navigation.navigate("PatientProfileScreen", { ptid: item._id });
    }

    return (
      <View>
        {/* {patients.map(patient => (
        <PatientGridTile id={patient.patientId} title={patient.title} color={patient.color} age={patient.age} gender={patient.gender} imageUrl={patient.imageUrl} onPress={presshandler}/>
      ))} */}

        <PatientGridTile
          id={item.patientId}
          firstName={item.firstName}
          lastName={item.lastName}
          nic={item.nic}
          email={item.email}
          onPress={presshandler}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />

      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        style={{ flex: 1 }}
      />
    </View>
  );
}
export default PatientsScreen;
