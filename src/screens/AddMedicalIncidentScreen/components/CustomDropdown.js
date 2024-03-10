import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Inputbar from './Inputbar';

const CustomDropdown = ({ options, setInputValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleItemPress = (item) => {
    setSelectedOption(item);
    setIsOpen(false); // Close dropdown
    setIsOtherSelected(item === 'Other');
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdownTrigger}>
        <Text style={styles.selectedItem}>{selectedOption || 'Select Incident type'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemPress(item)} style={styles.dropdownItem}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {isOtherSelected && (
        <Inputbar text1="Other Option" placeholder="Enter other option" setInputValue={setInputValue} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 20,
  },
  dropdownTrigger: {
    marginLeft: 10,
    marginTop: 10,
    borderColor: '#8e8e8e',
    borderWidth: 1,
    padding: 8,
    width: '90%',
    borderRadius: 10,
  },
  selectedItem: {
    fontSize: 16,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#8e8e8e',
    borderWidth: 1,
    width: '90%',
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default CustomDropdown;
