import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { Calendar } from "react-native-calendars";
import { Ionicons } from '@expo/vector-icons';

//navigate to medication adding form
const MedicationView = ({navigation}) => {
  const addMedication=()=>{
    navigation.navigate("AddMedication");
  };
  
  //navigate to medication view
  const viewMedication =()=>{
    navigation.navigate("ViewMedication");
  };
  return (
    <View style={{ backgroundColor: "#D9F8FF", flex: 1 }}>
      <Header name="Medication" />
      <Calendar
        style={{
          borderRadius: 10,
          marginRight: 30,
          marginLeft: 30,
          marginTop: 100,
          elevation: 4,
        }}
        onDayPress={(day) => {
          viewMedication();
          console.log(day);
        }}
      />
      <TouchableOpacity
        style={styles.roundedPlusButton}
        onPress={() => {
          addMedication();
        }}
      >
        <Ionicons name="add-circle" size={60} color="#3498db" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  roundedPlusButton: {
    position: "absolute",
    bottom: 50,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MedicationView;
