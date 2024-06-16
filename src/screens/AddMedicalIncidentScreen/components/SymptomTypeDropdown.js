import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import InputBar from "./Inputbar";

const SymptomTypeDropdown = ({
  selectedSymptomType,
  setSelectedSymptomType,
  options,
  placeholderText,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOtherOptionSelected, setIsOtherOptionSelected] = useState(false);

  const handleItemPress = (item) => {
    setSelectedSymptomType(item);
    setIsDropdownOpen(false); // Close dropdown
    setIsOtherOptionSelected(item === "Other");
    // setInputValue(null); // Reset input value when selecting from dropdown
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.dropdownTrigger}
      >
        <Text style={styles.selectedItem}>
          {selectedSymptomType || placeholderText}
        </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
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
      {isOtherOptionSelected && (
        <View style={styles.inputBarContainer}>
          <InputBar text1="Other:" placeholder="Type any other options" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: "1%",
  },
  dropdownTrigger: {
    padding: 10,
    borderColor: "#8e8e8e",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: "2%",
  },
  selectedItem: {
    fontSize: 16,
    fontWeight: "400",
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    left: 0,
    backgroundColor: "#f5f5f5",
    borderColor: "#8e8e8e",
    borderWidth: 1,
    width: "100%",
    zIndex: 2,
    borderRadius: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  inputBarContainer: {
    marginTop: 10,
  },
});

export default SymptomTypeDropdown;
