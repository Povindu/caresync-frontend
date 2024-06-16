import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

import { useEffect, useState } from "react";
import api from "../../Services/AuthService";

// Importing Components
import ViewDocCardComp from "./Components/ViewDocCardComp";
import Header from "../../components/Header";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../constants/constants";

function SelectDocForAccess({ navigation }) {
  const { user } = useAuthContext();
  const [DocList, setDocList] = useState([]);

  // Fetching Doctors from the backend
  const fetchDoctors = async () => {
    api
      .get(`${baseUrl}/patients/accessDoctorList/${user?._id}`)
      .then((response) => {
        console.log("response", response.data.accessDoctors);
        setDocList(response.data.accessDoctors);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Rendering the Doctor List Component
  const renderItem = ({ item }) => (
    <ViewDocCardComp
      navigation={navigation}
      name={item.firstName + " " + item.lastName}
      DocID={item.medicalId}
      DocDocuID={item._id}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header name={"Doctors With Access"} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {DocList && (
            <FlatList
              data={DocList}
              keyExtractor={(item) => item?._id}
              renderItem={renderItem}
            ></FlatList>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
});

export default SelectDocForAccess;
