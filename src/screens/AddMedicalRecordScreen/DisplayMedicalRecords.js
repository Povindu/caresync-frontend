import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import Header from "../../components/Header";
import MedicalRecordGrid from "../AddMedicalIncidentScreen/components/MedicalRecordGrid";
import { baseUrl } from "../../constants/constants";
import api from "../../Services/AuthService";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ScrollView } from "react-native-gesture-handler";

function DisplayMedicalRecords({ navigation }) {
  const { user } = useAuthContext();
  user && console.log("User ID:", user._id);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMedicalHistory = async () => {
    try {
      const response = await api.get(
        `${baseUrl}/medicalRecord/getRecordsPatient`,
        {
          params: {
            patientID: user._id,
          },
        }
      );
      console.log("Response from backend:", response.data);
      setMedicalRecords(response.data.patientRecords.medicalRecords); // Update state with fetched records
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  useEffect(() => {
    fetchMedicalHistory();
    const unsubscribe = navigation.addListener("focus", () => {
      // Refresh the data whenever the screen gains focus
      fetchMedicalHistory();
    });
    return unsubscribe;
  }, [navigation]);

  function renderCategoryItem({ item }) {
    // console.log("Item:", item);
    return (
      <View>
        <MedicalRecordGrid
          recordName={item.recordName}
          recordDescription={item.description}
          recordID={item._id}
          date={item.recordDate}
          incidents={item.incidents}
        />
      </View>
    );
  }

  const handleAddNew = () => {
    navigation.navigate("NewMedicalRecordScreen");
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMedicalHistory().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <Header name="Records History" />

      <View style={styles.background}>
        <View style={styles.container}>
          <FlatList
            data={medicalRecords}
            keyExtractor={(item) => item._id}
            renderItem={renderCategoryItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View style={styles.btn}>
            <Pressable onPress={handleAddNew}>
              <Text style={styles.btntext}>Add New Record</Text>
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
