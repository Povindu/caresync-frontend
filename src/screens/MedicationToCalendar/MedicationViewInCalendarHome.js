import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { baseUrl } from "../../constants/constants";
import { useEffect, useState } from "react";
import api from "../../Services/AuthService";
import { useAuthContext } from "../../hooks/useAuthContext";

import { useIsFocused } from "@react-navigation/native";

//navigate to medication adding form
const MedicationView = ({ navigation, route }) => {
  const { user } = useAuthContext();
  const { refresh } = route.params ? route.params : { refresh: false };
  const [currentUserID, setCurrentUserID] = useState(undefined);
  const [medidetail, setmedidetail] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [docMode, setDocMode] = useState(false);

  // console.log("Doc", docMode)

  const updateUser = () => {
    if (route.params?.PID === undefined) {
      console.log("PID is undefined");
      setCurrentUserID(user._id);
    } else {
      setCurrentUserID(route.params.PID);
      setDocMode(true);
      console.log("PID is defined", route.params.PID);
    }
  };

  useEffect(() => {
    getMarkdates();
    updateUser();
    if (currentUserID !== undefined) {
      getmedication();
    }
  }, [useIsFocused()]);


  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUserID !== undefined) {
      getmedication();
    }
  }, [currentUserID]);


  //get data and mark dates in calendar
  const getMarkdates = () => {
    setLoading(true);
    console.log("Current User ID", currentUserID);
    api
      .get(`${baseUrl}/medication/${currentUserID}`)
      .then((response) => {
        markDates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
        setLoading(false);
      });

  }

  };


  //mark dates in calendar
  const markDates = (data) => {
    const markedDatesObj = {};
    const currentDate = new Date(); // Get current date
    const todayDateString = currentDate.toISOString().split("T")[0];
    data.forEach((item) => {
      if (Array.isArray(item.dayArray)) {
        item.dayArray.forEach((date) => {
          if (date < todayDateString) {
            // Check if the date is before today
            markedDatesObj[date] = { selected: true, selectedColor: "#FF0000" }; // Mark it in red
          } else {
            markedDatesObj[date] = { selected: true, selectedColor: "#00567D" }; // Mark it in blue
          }
        });
      }
    });
    setMarkedDates(markedDatesObj);
  };

  const addMedication = () => {
    navigation.navigate("AddMedication", {
      refreshMedicationView: true,
      PID: docMode ? route.params.PID : null,
    });
  };


  const updateMedication = (id) => {
    const selectedItem = medidetail.find((item) => item._id === id);
    navigation.navigate("AddMedication", {
      refreshMedicationView: true,
      selectedItem,
      PID: docMode ? route.params.PID : null,
    });
  };

  //navigate to medication view
  const viewMedication = (day) => {
    console.log("Doc", docMode);
    navigation.navigate("ViewMedication", {
      selectedday: day,
      PID: docMode ? route.params.PID : null,
    });
  };

  return (
    <View style={{ backgroundColor: "#D9F8FF", flex: 1 }}>
      <Header name="Medication" />
      <Calendar
        style={{
          borderRadius: 10,
          marginRight: 15,
          marginLeft: 15,
          marginTop: 100,
          elevation: 4,
        }}
        onDayPress={(day) => {
          viewMedication(day);
          console.log(day);
        }}
        markedDates={markedDates}
      />

      <TouchableOpacity
        style={styles.pastEntriesButton}
        onPress={() => {
          navigation.navigate("ViewPastEntries");
        }}
      >
        <Text style={styles.pastEntriesText}>Past Entries</Text>
      </TouchableOpacity>

//       {loading ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Loading...</Text>
//         </View>
//       ) : medidetail.length === 0 ? (
//         <View style={styles.centered}>
//           <Text>No medications</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={medidetail}
//           renderItem={({ item }) => (
//             <View style={styles.listContainer}>
//               <View style={styles.dateContainer}>
//                 <Text style={styles.datetext}>{item.addedDate}</Text>
//               </View>
//               <Text style={styles.medicineNametext}>{item.medicine}</Text>
//               <Text style={styles.daystext}>For {item.days} Day/s</Text>
//               <View style={styles.detailContainer}>
//                 <Text style={styles.pilltext}>{item.pills} pill/s</Text>
//                 <Text style={styles.timestext}>
//                   {item.times} time/s per day
//                 </Text>
//                 <Text style={styles.bawtext}>{item.baw} meal</Text>
//               </View>
//               {item.description !== null && item.description !== "" && (
//                 <Text style={styles.descriptiontext}>{item.description}</Text>
//               )}
//               <View style={styles.listbottom}>
//                 <View style={styles.byContainer}>
//                   <Text style={styles.bytext}>By {item.addedBy}</Text>
//                 </View>
//                 <View style={styles.editdeleteContainer}>
//                   <TouchableOpacity
//                     disabled={
//                       docMode
//                         ? item.addedBy !== user.fName
//                         : item.addedBy !== "patient"
//                     }
//                     onPress={() => {
//                       updateMedication(item._id);
//                     }}
//                   >
//                     <Text
//                       style={[
//                         styles.edittext,
//                         (docMode
//                           ? item.addedBy !== user.fName
//                           : item.addedBy !== "patient") &&
//                           styles.disabledButton,
//                       ]}
//                     >
//                       Edit
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => {
//                       if (
//                         docMode
//                           ? item.addedBy !== user.fName
//                           : item.addedBy !== "patient"
//                       ) {
//                         confirmDelete(item._id);
//                       } else {
//                         deleteOneResult(item._id);
//                       }
//                     }}
//                   >
//                     <Text style={styles.deletetext}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           )}
//         />
//       )}

      <TouchableOpacity
        style={styles.roundedPlusButton}
        onPress={() => {
          addMedication();
        }}
      >
        <Ionicons name="add-circle" size={60} color="#00567D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
  pastEntriesButton: {
    position: "absolute",
    bottom: 45,
    right: 90,
    backgroundColor: "#00567D",
    padding:15,
    borderRadius: 10
  },
  pastEntriesText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  roundedPlusButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MedicationView;
