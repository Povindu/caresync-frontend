import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { TextInput, RadioButton } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const AddMedication = () => {
  const [checked, setChecked] = useState("before");

  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number);

  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  let sDate = `${padtoTwo(date)}/${padtoTwo(month)}/${year}`;

  const AlertBox = () => {
    Alert.alert(
      "Successful message",
      "Add medication to the calendar successfully.",
      [
        {
          text: "ok",
          onPress: () => {},
        },
      ]
    );
  };
  return (
      <View style={{ flex: 1 }}>
        <Header name="Add Medication" />
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topics}>Name of Medicine</Text>
          <View style={styles.nameContainer}>
            <TextInput placeholder="Panadol" style={styles.textName} />
            <EvilIcons name="search" size={26} color="gray" />
          </View>
          <Text style={styles.topics}>Starting Date</Text>
          <Text style={styles.subtopics}>When do you start medication?</Text>
          <View style={styles.nameContainer}>
            <TextInput placeholder={sDate} style={styles.textName} />
            <EvilIcons name="calendar" size={28} color="gray" />
          </View>
          <Text style={styles.topics}>Dosage & Duration</Text>
          <Text style={styles.subtopics}>
            How many pills need to take at once? & How long?
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.nameContainer2}>
              <TextInput placeholder="1 pill" style={styles.textName2} />
              <AntDesign name="down" size={16} color="gray" />
            </View>
            <View style={styles.nameContainer2}>
              <TextInput placeholder="10 days" style={styles.textName2} />
              <AntDesign name="down" size={16} color="gray" />
            </View>
          </View>
          <Text style={styles.topics}>Time</Text>
          <Text style={styles.subtopics}>
            Add times when you need to take pills
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.nameContainer3}>
              <TextInput placeholder="00:00 AM" style={styles.textName3} />
            </View>
            <Text style={{ marginTop: 15, marginRight: 10 }}>or</Text>
            <View style={styles.nameContainer3}>
              <TextInput placeholder="Morning" style={styles.textName3} />
            </View>
            <Ionicons
              name="add-circle"
              size={40}
              color="gray"
              style={{ marginTop: 5 }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View style={styles.nameContainer4}>
              <Text style={styles.textName4}>09:00 AM</Text>
              <MaterialIcons name="delete-outline" size={24} color="red" />
            </View>
            <View style={styles.nameContainer4}>
              <Text style={styles.textName4}>Morning</Text>
              <MaterialIcons name="delete-outline" size={24} color="red" />
            </View>
          </View>
          <View></View>
          <Text style={styles.topics}>Food & Pill</Text>
          <Text style={styles.subtopics}>
            What's the time you need to take pill?
          </Text>
          <View style={styles.radioButtons}>
            <RadioButton
              value="before"
              status={checked === "before" ? "checked" : "unchecked"}
              onPress={() => setChecked("before")}
            />
            <Text style={styles.radioText}>Before</Text>
            <RadioButton
              value="after"
              status={checked === "after" ? "checked" : "unchecked"}
              onPress={() => setChecked("after")}
            />
            <Text style={styles.radioText}>After</Text>
            <RadioButton
              value="with"
              status={checked === "with" ? "checked" : "unchecked"}
              onPress={() => setChecked("with")}
            />
            <Text style={styles.radioText}>With Food</Text>
          </View>

          <Text style={styles.topics}>Add notes</Text>
          <TextInput
            multiline
            numberOfLines={5}
            maxLength={50}
            placeholder="Description"
            style={{ padding: 5, backgroundColor: "white", marginTop: 5 }}
          />
          <View style={{ alignItems: "center", padding: 10 }}>
            <TouchableOpacity style={styles.button} onPress={AlertBox}>
              <Text style={styles.buttontext}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
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
  topics: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtopics: {
    fontSize: 16,
    color: "gray",
  },
  nameContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    backgroundColor: "white",
    height: 40,
    width: "82%",
    marginLeft: 10,
    marginRight: 10,
  },
  nameContainer2: {
    marginTop: 5,
    marginBottom: 5,
    width: "45%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  textName2: {
    backgroundColor: "white",
    height: 40,
    width: "65%",
    marginLeft: 10,
    marginRight: 10,
  },
  nameContainer3: {
    marginTop: 5,
    marginBottom: 5,
    width: "38%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  textName3: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    marginLeft: 10,
  },
  nameContainer4: {
    marginTop: 5,
    marginBottom: 5,
    width: "45%",
    backgroundColor: "gray",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  textName4: {
    color: "white",
    backgroundColor: "gray",
    height: 40,
    width: "70%",
    marginLeft: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },
  buttontext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  radioButtons: {
    display: "flex",
    flexDirection: "row",
  },
  radioText: {
    marginTop: 8,
    fontSize: 17,
    marginRight: 30,
  },
});

export default AddMedication;
