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
import axios from "axios";
import { useState, useEffect } from "react";

function PatientProfileScreen({ route, navigation }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://192.168.137.1:8012/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const pId = route.params.ptid;
  const dispalyedpatient = patients.filter((patient) => {
    return patient._id.indexOf(pId) >= 0;
  });

  function renderCategoryItem({ item }) {
    return (
      <View>
        <View>
          <View style={styles.subcon}></View>

          <View style={styles.grid}>
            <PatientSummary
              id={item.patientId}
              title={item.title}
              age={item.age}
              gender={item.gender}
              imageUrl={item.imageUrl}
              weight={item.weight}
              height={item.height}
              blood={item.blood}
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
              onPress={() => navigation.navigate}
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
              onPress={() => navigation.navigate("MedicationsScreen")}
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
              onPress={() => navigation.navigate}
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Past Appointments </Text>
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
              onPress={() => navigation.navigate}
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Test Results</Text>
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
              onPress={() => navigation.navigate}
            >
              <Image
                style={styles.img}
                source={require("../../ViewPatientSummaryHome Screen/Images/doc.png")}
              />
              <Text style={styles.text}>Contact Patient</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tile1}>
            {/* <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20,}} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                                <Text style={styles.text} >Patient History</Text>
                            </TouchableOpacity> */}
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
  );
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
