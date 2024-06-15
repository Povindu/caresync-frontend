import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../MedicalTestHomeScreen/components/Header";
import { TextInput, RadioButton } from "react-native-paper";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import api from "../../../Services/AuthService";
import { baseUrl } from "../../../constants/constants";
import { format, addDays, eachDayOfInterval } from "date-fns";
import DatePicker from "react-native-modern-datepicker";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { SelectList } from "react-native-dropdown-select-list";
import { UsesNonExemptEncryption } from "@expo/config-plugins/build/ios";

const AddMedication = ({ navigation, route }) => {
  const [medicineName, setMedicineName] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [pillAmount, setPillAmount] = useState("");
  const [noofdays, setnoofDays] = useState("");
  const [choosePeriod, setchoosePeriod] = useState(1);
  const [description, setdescription] = useState("");
  const [checked, setChecked] = useState("before");
  const [frequency, setfrequency] = useState("day");
  const [mediType, setmediType] = useState("Tablet");
  const [unit, setunit] = useState("mg");
  const [duration, setDuration] = useState("days")

  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number);
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  let sDate = `${year}-${padtoTwo(month)}-${padtoTwo(date)}`;

  const [isEdit, setisEdit] = useState(false);
  const { selectedItem } = route.params;
  const { user } = useAuthContext();
  const today = new Date();
  const startingDate = format(new Date(today), "yyyy-MM-dd");

  const frequencyList = [
    {
      key: "hour",
      value: "hour",
    },
    {
      key: "day",
      value: "day",
    },
    {
      key: "every other day",
      value: "every other day",
    },
    {
      key: "week",
      value: "week",
    },
    {
      key: "month",
      value: "month",
    },
  ];

  const mediTypeList = [
    {
      key: "Tablet",
      value: "Tablet",
    },
    {
      key: "Injection",
      value: "Injection",
    },
    {
      key: "Syrup",
      value: "Syrup",
    },
  ];

  const unitList = {
    Tablet: [
      {
        key: "mg",
        value: "mg",
      },
      {
        key: "micrograme",
        value: "micrograme",
      },
    ],
    Injection: [
      {
        key: "ml",
        value: "ml",
      },
    ],
    Syrup: [
      {
        key: "ml",
        value: "ml",
      },
    ],
  };

  const durationList = [
    {
      key: "days",
      value: "days",
    },
    {
      key: "weeks",
      value: "weeks",
    },
    {
      key: "months",
      value: "months",
    },
  ];

  useEffect(() => {
    console.log(selectedItem);
    if (selectedItem) {
      // Populate the form fields with selectedItem values
      setMedicineName(selectedItem.medicine);
      setDateInput(selectedItem.date);
      setPillAmount(selectedItem.pills.toString());
      setnoofDays(selectedItem.days.toString());
      setchoosePeriod(selectedItem.times);
      setChecked(selectedItem.baw);
      setdescription(selectedItem.description);
      setisEdit(true);
    }
  }, [selectedItem]);

  //refresh medications when add a new medication
  const refreshMedicationView = () => {
    navigation.navigate("MedicationView", { refresh: true });
  };

  //generate and store all dates between start date and end date in an array
  const generateDateRange = (startDate, numberOfDays) => {
    const endDate = addDays(startDate, numberOfDays - 1);
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    return dates.map((date) => format(date, "yyyy-MM-dd"));
  };

  const dayArray = generateDateRange(dateInput, noofdays);

  const by = "patient";

  //add new medication to the database
  const addmedication = () => {
    const payload = {
      userID: user._id,
      addedBy: by,
      medicine: medicineName,
      addedDate: dateInput,
      pills: pillAmount,
      days: noofdays,
      dayArray: dayArray,
      times: choosePeriod,
      baw: checked,
      description: description,
    };
    api
      .post(`${baseUrl}/medication/add`, payload)
      .then(() => {
        console.log("add", sDate, mediType, unit, frequency, duration);
        setisEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //update existing medication in the database
  const updatemedication = (id) => {
    const payload = {
      userID: user._id,
      medicine: medicineName,
      addedDate: dateInput,
      pills: pillAmount,
      days: noofdays,
      dayArray: dayArray,
      times: choosePeriod,
      baw: checked,
      description: description,
    };
    api
      .put(`${baseUrl}/medication/update/${id}`, payload)
      .then((response) => {
        console.log("add", sDate, mediType, unit, frequency, duration);
        setisEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //show alert when press the add medication button
  const AlertBox = () => {
    Alert.alert(
      "Successful message",
      `${isEdit ? "Update" : "Add"} medication to the calendar successfully.`,
      [
        {
          text: "ok",
          onPress: () => {
            if (!isEdit) {
              addmedication();
            } else {
              updatemedication(selectedItem._id);
            }
            refreshMedicationView();
          },
        },
      ]
    );
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name={isEdit ? "Update Medications" : "Add Medications"} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.topics}>Medication Strength</Text>
          <View style={styles.strengthContainer}>
            <SelectList
              setSelected={setmediType}
              data={mediTypeList}
              placeholder="Tablet"
              defaultOption={{ key: "Tablet", value: "Tablet" }}
            />
            <SelectList
              setSelected={setunit}
              data={unitList[mediType]}
              placeholder="mg"
              defaultOption={unitList[mediType][0]}
            />
          </View>
          <Text style={styles.topics}>Name of Medicine</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="Name of Medicine"
              style={styles.textName}
              onChangeText={setMedicineName}
            />
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="search" size={26} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.topics}>Starting Date</Text>
          <Text style={styles.subtopics}>When do you start medication?</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="yyyy-mm-dd"
              onChangeText={setDateInput}
              style={styles.textName}
              value={dateInput}
            />
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <EvilIcons name="calendar" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          {/*create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startingDate}
                  onSelectedChange={(day) => {
                    const formattedDate = day.replace(/\//g, "-");
                    setDateInput(formattedDate);
                    console.log(formattedDate);
                  }}
                  options={{
                    backgroundColor: "white",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "black",
                    selectedTextColor: "black",
                    mainColor: "#469ab6",
                    textSecondaryColor: "black",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "black" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.topics}>Dosage</Text>
          <Text style={styles.subtopics}>
            How many pills need to take at once? & How long?
          </Text>
          <View style={styles.strengthContainer}>
            <View style={styles.nametimeContainer}>
              <TextInput
                placeholder="dosage"
                onChangeText={setPillAmount}
                keyboardType="numeric"
                style={styles.texttime}
              />
            </View>
            <Text>{unit}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.topics}>Time</Text>
              <View style={styles.nametimeContainer}>
                <TextInput
                  placeholder="times"
                  onChangeText={setchoosePeriod}
                  keyboardType="numeric"
                  style={styles.texttime}
                />
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.topics}>Frequency</Text>
              <View style={styles.freqdropdown}>
                <SelectList
                  setSelected={setfrequency}
                  data={frequencyList}
                  placeholder="day"
                  defaultOption={{ label: "day", value: "day" }}
                />
              </View>
            </View>
          </View>
          <Text style={styles.topics}>Duration</Text>
          <View style={styles.strengthContainer}>
          <View style={styles.nametimeContainer}>
            <TextInput
              placeholder="duration"
              onChangeText={setnoofDays}
              keyboardType="numeric"
              style={styles.texttime}
            />
          </View>
          <SelectList
              setSelected={setDuration}
              data={durationList}
              placeholder="days"
              defaultOption={{ key: "days", value: "days" }}
            />
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
            numberOfLines={3}
            maxLength={50}
            placeholder="Description"
            onChangeText={setdescription}
            style={{ padding: 5, backgroundColor: "white", marginTop: 5 }}
          />
          <View style={{ alignItems: "center", padding: 10 }}>
            <TouchableOpacity style={styles.button} onPress={AlertBox}>
              <Text style={styles.buttontext}>
                {isEdit ? "Update Medication" : "Add Medication"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  strengthContainer: {
    display: "flex",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    width: "95%",
    height: "80%",
    padding: 15,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
  },
  topics: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtopics: {
    fontSize: 14,
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
  texttime: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    marginLeft: 10,
    marginRight: 10,
  },
  nametimeContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: "55%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
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
    fontSize: 14,
    fontWeight: "bold",
  },
  radioButtons: {
    display: "flex",
    flexDirection: "row",
  },
  radioText: {
    marginTop: 8,
    fontSize: 13,
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
    marginLeft: 100,
    marginTop: 330,
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
  freqdropdown: {
    width: "80%",
  },
});

export default AddMedication;
