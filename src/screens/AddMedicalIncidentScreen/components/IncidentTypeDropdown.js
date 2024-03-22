import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Calendar from './Calendar'; // Assuming this is the path to your Calendar component
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
  const dropdownItems = ['TEST', 'SYMPTOM', 'PRESCRIPTION', 'MEDICATION', 'APPOINTMENT'];
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const saveIncident = async () => {
    try {
      if (!selectedDate) {
        throw new Error("Date is required.");
      }
  
      const res = await fetch("http://10.10.8.227:4003/api/medicalIncident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incidentType: selectedOption,
          date: selectedDate,
        }),
      });
  
      console.log("Response status:", res.status);
  
      const responseData = await res.json(); // Parse response body as JSON
  
      if (!res.ok) {
        throw new Error(`Failed to save incident. Server response: ${JSON.stringify(responseData)}`);
      }
  
      console.log("Success:", responseData);
    } catch (error) {
      console.error("Error saving incident:", error.message);
    }
  };
  
  
  const handleSelect = (item) => {
    setSelectedOption(item);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNextPress = () => {
    setModalVisible(true);
  };

  const renderModalContent = () => {
    // Render modal content based on selected option
    switch (selectedOption) {
      case 'TEST':
        return <TestModal onClose={handleCloseModal} />;
      case 'SYMPTOM':
        return <SymptomModal onClose={handleCloseModal} />;
      case 'PRESCRIPTION':
        return <PrescriptionModal onClose={handleCloseModal} />;
      case 'MEDICATION':
        return <MedicationModal onClose={handleCloseModal} />;
      case 'APPOINTMENT':
        return <AppointmentModal onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  const handleCombinedPress = () => {
    handleNextPress(); // Open the modal
    saveIncident(); // Save the incident
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
  };

  return (
    <View style={styles.container}>
      <Calendar onDateChange={handleDateChange} />
      <Inputbar
        text1="Incident Type"
        placeholder="Select Incident type"
        dropdownItems={dropdownItems}
        onSelect={handleSelect}
      />
      <TouchableOpacity style={styles.btn} onPress={handleCombinedPress}>
        <Text style={styles.btntext}>Next</Text>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          {renderModalContent()}
        </Modal>
      </View>
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
    fontWeight: 'bold',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 155,
    left: 28,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 8,
    width: '88%',
    zIndex: 2,
    paddingHorizontal: 12,
  },
  dropdownItem: {
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e1e1e',
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
    elevation: 4,
  },
  btntext: {
    color: '#FFF',
    padding: 8,
    fontSize: 16,
  },
});

export default IncidentTypeDropdown;
