import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Calendar from './Calendar';
import TestModal from './Modals/TestModal';
import SymptomModal from './Modals/SymptomModal';
import PrescriptionModal from './Modals/PrescriptionModal';
import MedicationModal from './Modals/MedicationModal';
import AppointmentModal from './Modals/AppointmentModal';

const Inputbar = ({ text1, placeholder, dropdownItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDropdownPress = () => {
    setIsOpen(!isOpen);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item); // Call onSelect callback with selected item
  };

  return (
    <View style={styles.inputcontainer}>
      <Text style={styles.text1}>{text1}</Text>
      <TouchableOpacity onPress={handleDropdownPress} style={styles.dropdownTrigger}>
        <Text style={styles.selectedItem}>{selectedItem || placeholder}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {dropdownItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemPress(item)} style={styles.dropdownItem}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const IncidentTypeDropdown = () => {
  const dropdownItems = ['Test', 'Symptom', 'Prescription', 'Medication', 'Appointment'];
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    setSelectedOption(item); // Set selected option
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
  };

  const handleNextPress = () => {
    setModalVisible(true); // Open the modal
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case 'Test':
        return <TestModal onClose={handleCloseModal} />;
      case 'Symptom':
        return <SymptomModal onClose={handleCloseModal} />;
      case 'Prescription':
        return <PrescriptionModal onClose={handleCloseModal} />;
      case 'Medication':
        return <MedicationModal onClose={handleCloseModal} />;
      case 'Appointment':
        return <AppointmentModal onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Calendar />
      <Inputbar text1="Incident Type" placeholder="Select Incident type" dropdownItems={dropdownItems} onSelect={handleSelect} />
      <TouchableOpacity style={styles.btn} onPress={handleNextPress}>
        <Text style={styles.btntext}>Next</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    
  },
  inputcontainer: {
    paddingTop: 20,
    justifyContent: 'center',
    
  },
  text1: {
    marginLeft: 28,
    fontSize: 20,
    color: '#1e1e1e',
    marginTop: 50,
  },
  dropdownTrigger: {
    marginLeft: 28,
    marginTop: 10,
    borderColor: '#8e8e8e',
    borderWidth: 1,
    padding: 8,
    width: '88%',
    borderRadius: 10,
  },
  selectedItem: {
    fontSize: 16,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 115,
    left: 26,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#8e8e8e',
    borderWidth: 1,
    width: '89%',
    zIndex: 2,
    padding: 10,
    paddingBottom: 20,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#00567D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    maxWidth: '100%',
    padding: 2,
    bottom: -505,
    alignItems: 'center',
  },
  btntext: {
    color: '#FFF',
    padding: 8,
    fontSize: 16,
  },
});

export default IncidentTypeDropdown;
