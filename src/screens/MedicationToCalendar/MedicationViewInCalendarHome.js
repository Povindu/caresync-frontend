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

//navigate to medication adding form
const MedicationView = ({ navigation, route }) => {
  
  const { user } = useAuthContext();
  const { refresh } = route.params ? route.params : { refresh: false };

  useEffect(() => {
    getMarkdates();
    if (refresh) {
      getMarkdates();
    }
  }, [refresh]);

  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  //get data and mark dates in calendar
  const getMarkdates = () => {
    setLoading(true);
    api
      .get(`${baseUrl}/medication/${user._id}`)
      .then((response) => {
        markDates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
        setLoading(false);
      });
  }

    // const URL = `${baseUrl}/medication`;
    // fetch(URL)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setmedidetail(data);
    //     markDates(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Axios Error : ", error);
    //     setLoading(false);
    //   });

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
    navigation.navigate("AddMedication", { refreshMedicationView: true });
  };

  //navigate to medication view
  const viewMedication = (day) => {
    navigation.navigate("ViewMedication", { selectedday: day });
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
