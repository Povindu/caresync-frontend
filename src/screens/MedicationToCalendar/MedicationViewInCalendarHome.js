import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Calendar } from "react-native-calendars";

const MedicationView = ({navigation}) => {
  const today = new Date().toISOString().split('T')[0];

  const addMedication=()=>{
    navigation.navigate("AddMedication");
  };
  
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
        markedDates={{
          [today]: { selected: true, selectedColor: 'blue' },
        }}
        onDayPress={(day) => {
          viewMedication();
        }}
      />
      <TouchableOpacity
        style={styles.roundedPlusButton}
        onPress={() => {
          addMedication();
        }}
      >
        <Text style={styles.plusButtonText}>+</Text>
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
    backgroundColor: "#3498db",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MedicationView;
