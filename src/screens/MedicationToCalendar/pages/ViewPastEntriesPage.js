import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../../MedicalTestHomeScreen/components/Header";
import { useState, useEffect } from "react";
import api from "../../../Services/AuthService";
import { baseUrl } from "../../../constants/constants";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const ViewPastEntries = ({ navigation }) => {
  useEffect(() => {
    getmedication();
  }, []);

  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [medidetail, setmedidetail] = useState([]);

  //API integration for get results
  const getmedication = () => {
    setLoading(true);
    api
      .get(`${baseUrl}/medication/${user._id}`)
      .then((response) => {
        setmedidetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
        setLoading(false);
      });
  };

  //API integration for delete a specific medication
  const deleteOneResult = (id) => {
    console.log(id);
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this medication?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel deletion");
          },
        },
        {
          text: "OK",
          onPress: () => {
            api
              .delete(`${baseUrl}/medication/${id}`)
              .then(() => {
                getmedication();
              })
              .catch((error) => {
                console.error("Axios Error : ", error);
              });
          },
        },
      ]
    );
  };

  const confirmDelete = (id) => {
    console.log(id);
    Alert.alert(
      "Confirm Delete",
      "Added by doctor, Are you sure you want to delete this medication?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel deletion");
          },
        },
        {
          text: "OK",
          onPress: () => deleteOneResult(id),
        },
      ]
    );
  };

  const updateMedication = (id) => {
    const selectedItem = medidetail.find((item) => item._id === id);
    navigation.navigate("AddMedication", {
      refreshMedicationView: true,
      selectedItem,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name="Medications Entries" />
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : medidetail.length === 0 ? (
        <View style={styles.centered}>
          <Text>No medications</Text>
        </View>
      ) : (
        <FlatList
          data={medidetail}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text style={styles.medicineNametext}>{item.medicine}</Text>
              <Text>Medication from : {item.addedDate}</Text>
              <Text style={styles.daystext}>For {item.days} Day/s</Text>
              <View style={styles.detailContainer}>
                <Text style={styles.pilltext}>{item.pills} pill/s</Text>
                <Text style={styles.timestext}>
                  {item.times} time/s per day
                </Text>
                <Text style={styles.bawtext}>{item.baw} meal</Text>
              </View>
              {item.description !== null && item.description !== "" && (
                <Text>{item.description}</Text>
              )}
              <View style={styles.listbottom}>
                <Text style={styles.bytext}>added by : {item.addedBy}</Text>
                <View style={styles.editdeleteContainer}>
                  <TouchableOpacity
                    disabled={item.addedBy !== "patient"}
                    onPress={() => {
                      //console.log(item._id);
                      updateMedication(item._id);
                    }}
                  >
                    <Feather
                      style={[item.addedBy !== "patient" && styles.editext]}
                      name="edit-2"
                      size={16}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.addedBy !== "patient") {
                        confirmDelete(item._id);
                      } else {
                        deleteOneResult(item._id);
                      }
                    }}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={16}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: "90%",
    marginBottom: 5,
    backgroundColor: "#dedee0",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    elevation: 4,
  },
  dateContainer: {
    backgroundColor: "#00567D",
    padding: 7,
    width: "40%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: -25,
  },
  datetext: {
    color: "white",
    fontSize: 16,
  },
  medicineNametext: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#00567D",
  },
  daystext: {
    marginTop: -20,
    marginLeft: 220,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 2,
    marginBottom: 2,
  },
  pilltext: {
    paddingRight: 30,
  },
  timestext: {
    paddingRight: 30,
  },
  descriptiontext: {
    paddingLeft: 10,
    padding: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    elevation: 10,
    marginTop: 10,
  },
  listbottom: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  bytext: {
    marginTop: 10,
    color: "gray",
    fontSize: 11,
  },
  editdeleteContainer: {
    Positions: "absolute",
    marginLeft: 150,
    display: "flex",
    flexDirection: "row",
    alignItems: "right",
    alignSelf: "right",
    marginTop: 5,
  },
  editext: {
    color: "gray",
  },
});

export default ViewPastEntries;
