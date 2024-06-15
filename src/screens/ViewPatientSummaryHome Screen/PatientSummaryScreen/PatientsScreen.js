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
  const [filteredPatients, setFilteredPatients] = useState([]);

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
  const handleSearch = (filteredData) => {
    setFilteredPatients(filteredData);
  };

  function renderCategoryItem({ item }) {
    function presshandler() {
      navigation.navigate("PatientProfileScreen", { ptid: item._id });
    }

    return (
      <View>
        <PatientGridTile
          id={item.patientId}
          firstName={item.firstName}
          lastName={item.lastName}
          nic={item.nic}
          email={item.email}
          profileImage={item.profileImage}
          onPress={presshandler}
        />
        {/* export data to PatientGridTile page */}
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader patients={patients} onSearch={handleSearch} />
      {/* <Search patients={patients}  /> */}

      <FlatList
        data={filteredPatients.length > 0 ? filteredPatients : patients}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        style={{ flex: 1 }}
      />
      {/* Flatlist to display the patients */}
    </View>
  );
}
export default PatientsScreen;
