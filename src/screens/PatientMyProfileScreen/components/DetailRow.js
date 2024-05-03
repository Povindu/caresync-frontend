import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Slider,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import axios from "axios";
import { baseUrl } from "../../../constants/constants";
import Dropdown from "./Dropdown";
import BirthdayCalendar from "./BirthdayCalendar";
import { Picker } from "@react-native-picker/picker";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DetailRow = ({ name, textLineOne, textLineTwo, category }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState("John Doe");
  const [newFullName, setNewFullName] = useState("");
  const [fullname, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("60");
  const [selectedHeight, setSelectedHeight] = useState("170");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // Function to generate years array (adjust as needed)
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i.toString());
    }
    console.log(years);
    return years;
  };

  // Function to generate days array based on selected month and year (adjust as needed)
  const generateDays = () => {
    if (!selectedYear || !selectedMonth) return [];
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i.toString());
    }
    return days;
  };

  const handleBloodGroupSelect = (selectedGroup) => {
    setBloodGroup(selectedGroup);
  };

  const handleDate = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  // const handleUpdateProfile = () => {
  //   // Update profile with new full name
  //   console.log("New full name: ", inputValue);

  //   setNewFullName(inputValue);
  //   setModalVisible(false);
  // };
  const _id = "662e930c4c0bf9f41d0da56a";
  // console.log(booodGroup);

  const handleUpdateProfile = () => {
    // Prepare the updated data based on the category
    let updatedData = {};
    switch (category) {
      case "fullName":
        if (fullname.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          // Proceed with update function
          console.log("Updating profile with:", fullname);
          updatedData = { firstName: fullname, lastname: fullname }; // Assuming your backend expects "fullName" field
          break;
        }

      case "email":
        if (email.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { email: email }; // Assuming your backend expects "email" field
          break;
        }
      case "mobile":
        if (phone.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { mobileNumber: phone }; // Assuming your backend expects "mobile" field
          break;
        }

      case "birthday":
        const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
        if (selectedDate.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { birthday: selectedDate }; // Assuming your backend expects "birthday" field
          break;
        }
      case "gender":
        if (selectedGender.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { gender: selectedGender }; // Assuming your backend expects "gender" field
          break;
        }
      case "weight":
        if (selectedWeight.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { weight: selectedWeight }; // Assuming your backend expects "weight" field
          break;
        }
      case "height":
        if (selectedHeight.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { height: selectedHeight }; // Assuming your backend expects "height" field
          break;
        }
      case "blood":
        if (bloodGroup.trim() === "") {
          // Alert.alert("Error", "Please enter a name");
        } else {
          updatedData = { blood: bloodGroup }; // Assuming your backend expects "bloodGroup" field
          break;
        }
      default:
        break;
    }

    // Make an HTTP PUT request to update the patient's information
    axios
      .put(`${baseUrl}/patients/${_id}`, updatedData) // Assuming your backend route for updating patient info is '/patients/:id'
      .then((response) => {
        console.log(
          "Patient information updated successfully: ",
          response.data
        );
        // Optionally, you can perform additional actions after successful update
      })
      .catch((error) => {
        console.error("Failed to update patient information: ", error);
        // Optionally, you can handle error cases
      });

    // Close the modal
    setModalVisible(false);
  };

  const incrementWeight = () => {
    setSelectedWeight(selectedWeight + 1);
  };

  const decrementWeight = () => {
    if (selectedWeight > 0) {
      setSelectedWeight(selectedWeight - 1);
    }
  };

  const incrementHeight = () => {
    setSelectedHeight(selectedHeight + 1);
  };

  const decrementHeight = () => {
    if (selectedHeight > 0) {
      setSelectedHeight(selectedHeight - 1);
    }
  };

  // const handleBloodGroupSelection = (group) => {
  //   setSelectedBloodGroup(group);
  //   setIsDropdownOpen(false);
  // };
  // const renderDropdown = () => {
  //   if (!isDropdownOpen) return null;
  //   return (
  //     <View style={styles.dropdown}>
  //       {bloodGroups.map((group, index) => (
  //         <TouchableOpacity
  //           key={index}
  //           style={styles.dropdownItem}
  //           onPress={() => handleBloodGroupSelection(group)}
  //         >
  //           <Text>{group}</Text>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // };

  // Define modal content based on category
  const renderModalContent = () => {
    switch (category) {
      case "fullName":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullname}
              onChangeText={(text) => setfullName(text)}
              placeholder="Enter new full name"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "email":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter new email address"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "mobile":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter new mobile number"
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      // Add more cases for other categories as needed

      case "birthday":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Birthday</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
              >
                {generateYears().map((years) => (
                  // console.log(years)
                  <Picker.Item
                    style={styles.years}
                    key={years}
                    label={years}
                    value={years}
                  />
                ))}
              </Picker>
              <Picker
                style={styles.picker}
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              >
                <Picker.Item label="January" value="01" />
                <Picker.Item label="February" value="02" />
                <Picker.Item label="March" value="03" />
                <Picker.Item label="April" value="04" />
                <Picker.Item label="May" value="05" />
                <Picker.Item label="June" value="06" />
                <Picker.Item label="July" value="07" />
                <Picker.Item label="August" value="08" />
                <Picker.Item label="September" value="09" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
              </Picker>
              <Picker
                style={styles.picker}
                selectedValue={selectedDay}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
              >
                {generateDays().map((day) => (
                  <Picker.Item key={day} label={day} value={day} />
                ))}
              </Picker>
            </View>
          </View>
        );
      case "gender":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Gender</Text>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Male")}
            >
              <Icon
                name={selectedGender === "Male" ? "dot-circle" : "circle"}
                size={20}
                color="black"
              />
              <Text style={styles.radioButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Female")}
            >
              <Icon
                name={selectedGender === "Female" ? "dot-circle" : "circle"}
                size={20}
                color="black"
              />
              <Text style={styles.radioButtonText}>Female</Text>
            </TouchableOpacity>
            <Button
              style={styles.Button}
              title="Save"
              onPress={handleUpdateProfile}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "weight":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Weight</Text>
            <View style={styles.weightControl}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={incrementWeight}
              >
                <Icon name="caret-up" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.selectedWeight}>{selectedWeight}</Text>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={decrementWeight}
              >
                <Icon name="caret-down" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );

      case "height":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select height</Text>
            <View style={styles.heightControl}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={incrementHeight}
              >
                <Icon name="caret-up" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.selectedheight}>{selectedHeight}</Text>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={decrementHeight}
              >
                <Icon name="caret-down" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "blood":
        return (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Blood Group</Text>
            <Dropdown
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              placeholderText="Select from the list"
              onSelect={handleBloodGroupSelect}
            />
            <Button title="Save" onPress={handleUpdateProfile} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={name} size={30} color="black" />
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.textLineOne}>{textLineOne}</Text>
        <Text style={styles.textLineTwo}>{textLineTwo}</Text>
        <View style={styles.horizontalLine} />
      </View>
      <TouchableOpacity
        style={styles.arrowRight}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="chevron-right" size={15} color="black" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>{renderModalContent()}</View>
      </Modal>
    </View>
  );
};

export default DetailRow;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginLeft: 30,
  },
  textcontainer: {
    flexDirection: "column",

    marginLeft: 40,
  },
  iconContainer: {
    marginTop: 8,
    flexDirection: "row",
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textLineOne: {
    fontSize: 16,
    color: "grey",
  },
  textLineTwo: {
    fontSize: 16,
    color: "black",
  },
  horizontalLine: {
    borderBottomWidth: 1, // Change the width as needed
    borderBottomColor: "#ccc", // Change the color as needed
    marginVertical: 15, // Adjust vertical spacing as needed
    width: 230,
  },
  arrowRight: {
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "60%", // Limit the height of the modal content
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sliderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  weightControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heightControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedWeight: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  selectedheight: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  arrowButton: {
    padding: 10,
  },
  Button: {
    marginTop: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "black",
  },
  years: {
    color: "black",
  },
});
