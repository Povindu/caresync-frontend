import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../../MedicalTestHomeScreen/components/Header";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/constants";
import api from "../../../Services/AuthService";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ViewMedication = ({ route }) => {
  const { user } = useAuthContext();

  const [medidetail, setmedidetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedday } = route.params;
  const day = new Date(selectedday.dateString);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(day);
  const year = day.getFullYear();
  const dayOfWeekFull = day.toLocaleDateString("en-US", { weekday: "long" });
  const dayOfWeek = dayOfWeekFull.split(" ")[0];

  useEffect(() => {
    getmedicationforDay(selectedday.dateString);
  }, [selectedday.dateString]);

  //get medication when touch calendar day
  const getmedicationforDay = (day) => {
    setLoading(true);
    console.log(day);
    api
      .get(`${baseUrl}/medication/date/${day}`, {
        params: {
          patientID: user._id,
        },
      })
      .then((response) => {
        console.log("Daily Data", response.data.response);
        setmedidetail(response.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
        setLoading(false);
      });

    // const URL = `${baseUrl}/medication/date/${day}`;
    // fetch(URL)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setmedidetail(data.response);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     setLoading(false);
    //   });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {console.log("medidetail ", medidetail)}
      <Header name="View Medication" />

      <View style={styles.dateContainer}>
        <Text style={styles.dateWeekDay}>{dayOfWeek}</Text>
        <Text style={styles.dateWeekDay}>{selectedday.day}</Text>
        <Text style={styles.dateWeekDay}>{month}</Text>
        <Text style={styles.dateWeekDay}>{year}</Text>
      </View>
      {(!loading && medidetail.length === 0)?(
        <Text style={styles.noMediText}>No Medications</Text>
      ):(
        <>
      {console.log(Array.isArray(medidetail))}
      {medidetail && (
        <FlatList
          data={medidetail}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              {console.log("test")}
              {console.log("item ", item)}
              <Text style={styles.medicineNametext}>{item.medicine}</Text>
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
              <Text style={styles.bytext}>added by : {item.addedBy}</Text>
            </View>
          )}
        ></FlatList>
      )}
      </>
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
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  dateWeekDay: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
    color: "gray",
  },
  listContainer: {
    width: "90%",
    marginBottom: 5,
    backgroundColor: "#dedee0",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 5,
    padding: 10,
  },
  medicineNametext: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#00567D",
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
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
  bytext: {
    marginTop: 10,
    color: "gray",
    fontSize: 11,
  },
  noMediText: {
    alignSelf: "center",
    marginTop: 200,
  }
});
export default ViewMedication;
