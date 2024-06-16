import PatientSummary from "../Components/PatientSummary";
import {
  FlatList,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import api from "../../../Services/AuthService";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/constants";

function PatientProfileScreen({ route, navigation }) {
  const [patients, setPatients] = useState([]);
  const PID = route.params.PID;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get(`${baseUrl}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }; //fetching the patients details from the backend

  const dispalyedpatient = patients.filter((patient) => {
    return patient._id.indexOf(PID) >= 0;
  });

  function renderCategoryItem({ item }) {
    return (
      <View>
        <View>
          <View style={styles.subcon}></View>

          <View style={styles.grid}>
            <PatientSummary
              id={item.patientId}
              firstName={item.firstName}
              lastName={item.lastName}
              nic={item.nic}
              email={item.email}
              blood={item.blood}
              weight={item.weight}
              height={item.height}
              gender={item.gender}
            />
          </View>
        </View>

        <View style={styles.row1}>
          <View style={styles.tile1}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 120,
                width: 160,
                borderRadius: 15,
                marginLeft: 20,
                marginTop: 20,
              }}
              // onPress={() =>
              //   // navigation.navigate("PatientHistoryScreen", { PID: PID })
              // }
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Patient History</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tile1}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 120,
                width: 160,
                borderRadius: 15,
                marginLeft: 20,
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate("MedicationView", { PID: PID })
              }
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Medications</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row1}>
          <View style={styles.tile1}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 120,
                width: 160,
                borderRadius: 15,
                marginLeft: 20,
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate("ContactPatientScreen", { PID: PID })
              }
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Contact Patient</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tile1}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 120,
                width: 160,
                borderRadius: 15,
                marginLeft: 20,
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate("TestResultScreen", { PID: PID })
              }
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Test Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.con}>
      <FlatList
        data={dispalyedpatient}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        style={{ flex: 1 }}
      />
    </View>
  ); //displaying the patient details
}
export default PatientProfileScreen;
const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: "#D0F1FF",
  },
  subcon: {
    width: "100%",
    height: 300,
    backgroundColor: "#00567D",
    marginTop: -50,
  },
  grid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: -160,
    borderRadius: 15,
    marginLeft: "5%", // 5% of the parent container's width
    marginRight: "5%",
    paddingBottom: "5%",
  },

  // tile1:{
  //     width:'40%',
  //     height:120,

  //     backgroundColor:'white',

  //     borderRadius:15
  //    },
  row1: {
    flexDirection: "row",
    marginLeft: "4%",
  },

  text: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },

  img: {
    width: 70,
    height: 70,
    marginLeft: 40,
    marginTop: 10,
  },
});
