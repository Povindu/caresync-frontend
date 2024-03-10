import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomDropdown from '../CustomDropdown';

const TestModal = ({ onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Test Modal Content</Text>
      <CustomDropdown options = {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Other']}
 />
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    alignItems: 'center',
    width: '90%',
    height: '90%',
    backgroundColor:'#121212.',
    
    elevation: 3, // Add elevation for border shadow
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
});

export default TestModal;
