import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Inputbar from "./Inputbar";
// import { Ionicons } from '@expo/vector-icons';

const MedicationFrequencyDropdown = ({
  selectedMedicationFrequency,
  setSelectedMedicationFrequency,
  options,
  setInputValue,
  placeholderText,
}) => {
  // const [selectedOption1, setSelectedOption1] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleItemPress = (item) => {
    setSelectedMedicationFrequency(item);
    setIsOpen(false); // Close dropdown
    setIsOtherSelected(item === "Other");
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.dropdownTrigger}
      >
        <Text style={styles.selectedItem}>
          {selectedMedicationFrequency || placeholderText}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleItemPress(item)}
              style={styles.dropdownItem}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {isOtherSelected && (
        <View style={styles.inputbarcontainer}>
          <Inputbar
            text1="Other:"
            placeholder="type any other options"
            setInputValue={setInputValue}
          />
        </View>
      )}
    </View>
  );
};
export default MedicationFrequencyDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 20,
  },
  dropdownTrigger: {
    marginLeft: 10,
    marginTop: 10,
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 8,
    width: "90%",
    borderRadius: 10,
  },
  selectedItem: {
    fontSize: 16,
    fontWeight: "400",
  },
  dropdownMenu: {
    position: "absolute",
    top: 55,
    left: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#8e8e8e",
    borderWidth: 1,
    width: "90%",
    zIndex: 2,
    padding: 10,
    borderRadius: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  inputbarcontainer: {
    marginLeft: "-5%",
  },
  placeholderText: {
    fontWeight: "00", // Adjust font weight as needed
  },
});
