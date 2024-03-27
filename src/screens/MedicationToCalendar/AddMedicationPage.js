import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { TextInput, RadioButton } from "react-native-paper";
import { EvilIcons,Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const AddMedication = () => {
  //const [medicine, setMedicine] = useState("")
  const [chooseTime, setchooseTime] = useState("00:00 AM"); //to store selected time, default morning 00:00 AM
  const [choosePeriod, setchoosePeriod] = useState("Morning"); //to store selected period, default Morning
  const [isModalVisible, setisModalVisible] = useState(false); //modal visibility for time selection
  const [isModalVisible2, setisModalVisible2] = useState(false); // modal visibility for period selection
  const [checked, setChecked] = useState("before"); //check radio button selection
  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number); //pack to two digits 0-9
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  let sDate = `${year}-${padtoTwo(month)}-${padtoTwo(date)}`; //set date 29/07/2024 format

  //post result API integration
  // const addForm = (data) => {
  //   const payload = {
  //     selectedDate : data.selectedDate,
  //     medicalDetails : data.medicalDetails,
  //   }
  //   axios
  //     .post('http://192.168.43.192:4000/api/add', payload)
  //     .then(() => {
  //       console.error("Saved in database successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Axios Error : ", error);
  //     });
  // };

  //show alert when press the add medication button
  const AlertBox = () => {
    Alert.alert(
      "Successful message",
      "Add medication to the calendar successfully.",
      [
        {
          text: "ok",
          onPress: () => {
            //addForm({selectedDate: sDate, medicalDetails:medicine});
          },
        },
      ]
    );
  };
  //function with modal visibility changing, parameter value boolean
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };
  const changeModalVisibility2 = (bool) => {
    setisModalVisible2(bool);
  };

  //time options
  const OPTIONS = [
    "00:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ]; 
  const OPTIONS2 = ["Morning", "Afternoon", "Evening", "Night"]; //period options
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  
  const onPressItem = (option) => {
    changeModalVisibility(false);
    setchooseTime(option);
  };

  const onPressItem2 = (option1) => {
    changeModalVisibility2(false);
    setchoosePeriod(option1);
  };

  //map time options with the modal items
  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.textItem}>{item}</Text>
      </TouchableOpacity>
    );
  });

  //map period options with the modal items
  const option2 = OPTIONS2.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem2(item)}
      >
        <Text style={styles.textItem}>{item}</Text>
      </TouchableOpacity>
    );
  });

  //function to reset time and period selection, add selection to below
  const circleButtonPress = () => {
    setchooseTime("00:00 AM");
    setchoosePeriod("Morning");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name="Add Medication" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topics}>Name of Medicine</Text>
          <View style={styles.nameContainer}>
            <TextInput placeholder="Search" style={styles.textName} />
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="search" size={26} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.topics}>Starting Date</Text>
          <Text style={styles.subtopics}>When do you start medication?</Text>
          <View style={styles.nameContainer}>
            <TextInput value={sDate} style={styles.textName} />
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="calendar" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.topics}>Dosage & Duration</Text>
          <Text style={styles.subtopics}>
            How many pills need to take at once? & How long?
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.nameContainer2}>
              <TextInput placeholder="1 pill" style={styles.textName2} />
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="down" size={16} color="gray" />
              </TouchableOpacity>
            </View>
            <View style={styles.nameContainer2}>
              <TextInput placeholder="10 days" style={styles.textName2} />
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="down" size={16} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.topics}>Time</Text>
          <Text style={styles.subtopics}>
            Add times when you need to take pills
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={styles.nameContainer3}
            >
              <Text style={styles.textName3}>{chooseTime}</Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}
            >
              <TouchableOpacity
                onPress={() => changeModalVisibility(false)}
                style={styles.modalContainer}
              >
                <View
                  style={[
                    styles.modal,
                    { width: WIDTH - 230, height: HEIGHT - 300 },
                  ]}
                >
                  <ScrollView>{option}</ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>

            <Text style={{ marginTop: 15, marginRight: 12 }}>or</Text>
            <TouchableOpacity
              onPress={() => changeModalVisibility2(true)}
              style={styles.nameContainer3}
            >
              <Text style={styles.textName3}>{choosePeriod}</Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible2}
              nRequestClose={() => changeModalVisibility2(false)}
            >
              <TouchableOpacity
                onPress={() => changeModalVisibility2(false)}
                style={styles.modalContainer2}
              >
                <View
                  style={[
                    styles.modal2,
                    { width: WIDTH - 230, height: HEIGHT - 570 },
                  ]}
                >
                  {option2}
                </View>
              </TouchableOpacity>
            </Modal>

            <TouchableOpacity
              onPress={() => {
                circleButtonPress();
              }}
            >
              <Ionicons
                name="add-circle"
                size={40}
                color="gray"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View style={styles.nameContainer4}>
              <Text style={styles.textName4}>Morning</Text>
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>

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
    marginRight: 8,
    justifyContent: "center",
  },
  textName3: {
    backgroundColor: "white",
    height: 30,
    marginTop: 10,
    fontSize: 16,
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
    marginRight: 18,
  },
  modalContainer: {
    flex: 1,
    marginLeft: 20,
    marginTop: 250,
  },
  modal: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 100,
  },
  modalContainer2: {
    flex: 1,
    marginLeft: 170,
    marginTop: 360,
  },
  modal2: {
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
  option: {
    alignItems: "flex-start",
  },
  textItem: {
    margin: 10,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default AddMedication;
