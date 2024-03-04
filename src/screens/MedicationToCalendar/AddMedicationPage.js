import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { TextInput } from "react-native-paper";

const AddMedication = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header name="Add Medication" />
      <View style={styles.container}>
        <Text style={styles.topics}>
          Name of Medicine
        </Text>
        <View style={styles.nameContainer}>
          <TextInput placeholder="Panadol" style={styles.textName} />
        </View>
        <Text style={styles.topics}>Starting Date</Text>
        <Text style={styles.subtopics}>
          When do you start medication?
        </Text>
        <View style={styles.nameContainer}>
          <TextInput placeholder="02/04/2024" style={styles.textName} />
        </View>
        <Text style={styles.topics}>
          Dosage & Duration
        </Text>
        <Text style={styles.subtopics}>
          How many pills need to take at once? & How long?
        </Text>
        <Text style={styles.topics}>Time</Text>
        <Text style={styles.subtopics}>
          Add times when you need to take pills
        </Text>
        <Text style={styles.topics}>Food & Pill</Text>
        <Text style={styles.subtopics}>
          What's the time you need to take pill?
        </Text>
        <Text style={styles.topics}>Add notes</Text>
        <View style={{alignItems:"center"}}>
        <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>Add Medication</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "80%",
    padding: 15,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
  },
  topics:{
    fontSize: 20,
    fontWeight: "bold"
  },
  subtopics:{
    fontSize: 16,
    color: "gray"
  },
  nameContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  textName: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    marginLeft: 10,
  },
  button:{
    backgroundColor:"#78CEFF",
    padding:10,
    borderRadius:10,
    width:150,
    alignItems:"center"
  },
  buttontext:{
    fontSize:18,
    fontWeight:"bold"
  }
});

export default AddMedication;
