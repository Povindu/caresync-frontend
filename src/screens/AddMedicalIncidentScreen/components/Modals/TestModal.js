import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView} from 'react-native';
import CustomDropdown from '../CustomDropdown';



const TestModal = ({ onClose }) => {
  const handleOKPress = () => {

  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Test Details</Text>
      {/* <ScrollView style={styles.scrollview}> */}
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Test Type:</Text>
        <View style={styles.dropdowncontainer}>
          <CustomDropdown options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Other']} placeholderText="Select from the list" />
        </View>
        <Text style={styles.label}>Test Provider:</Text>
        <View style={styles.dropdowncontainer}>
          <CustomDropdown options={['HOSPITAL', 'LAB', 'CLINIC', 'Other']} placeholderText="Select from the list" />
        </View>
        </View>
        {/* </ScrollView> */}
        
        <View style={styles.buttonContainer}>

          <View style={styles.buttonWrapper}>
            <Button title="Close" onPress={onClose} color="#00567D" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="OK" onPress={onClose} color="#00567D" />
          </View>
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    position: 'absolute',
    height: '75%',
    left: 0,
    right: 0,
    bottom: 10,
    marginLeft: '3%',
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    width: '94%',
  },
  scrollview:{
    maxHeight:'90%',
  },
  modalText: {
    fontSize: 22,
    fontWeight: '900',
    top: 0,
    position: 'absolute',
    padding: 10,
    color:"#013d59"
  },
  contentContainer: {
    width: '100%',
    top: 6,
    position: 'absolute',
    paddingTop: '6%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '92%',
    left: 30,
    // right: 15,
    top: 580,
  },
  buttonWrapper: {
    width: '40%', // Adjust as needed
  },
  label: {
    paddingTop: 40,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: '4%'
  },
  dropdowncontainer: {
    marginVertical: '-5%',

  },

});

export default TestModal;
