import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView} from 'react-native';
import CustomDropdown from '../CustomDropdown';
import Inputbar from '../Inputbar';
import PainRating from '../PainRating';



const TestModal = ({ onClose }) => {
  const handleOKPress = () => {

  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Symptom Details</Text>
      
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Symtop Description:</Text>
       
        
        <View style={styles.inputcontainer}>
        <Inputbar text1=""
            placeholder="Enter description here"
          />
        </View>
        
        <Text style={styles.label}>Frequency:</Text>
        <View style={styles.dropdowncontainer}>
          <CustomDropdown options={['Single time a day', 'Once in two days', 'Once in a week', 'Other']} placeholderText="Select from the list" />
        </View>
        <Text style={styles.label}>Severity: Out of 10</Text>
        <PainRating/>
        <Text style={styles.label}>Duration:</Text>
        <View style={styles.dropdowncontainer}>
          <CustomDropdown options={['Immediate', 'about a second', 'less than a minute', 'more than a minute', 'other']} placeholderText="Select from the list" />
        </View>
        </View>
        
        
        
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
    marginTop: '55%',
    position: 'absolute',
    height: '90%',
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
  
  topic:{
    paddingTop:30,
    fontSize:18,
    paddingLeft:15,
    fontWeight:'800'
  },
  modalText: {
    fontSize: 23,
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
    top: 710,
  },
  buttonWrapper: {
    width: '40%', // Adjust as needed
  },
  label: {
    paddingTop: 25,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: '8%'
  },
  inputcontainer: {
    marginVertical: '-16%',
    paddingBottom:'8%'

  },
  dropdowncontainer: {
    marginLeft: '4%',
    
    marginVertical: '-6%',
    
   

  },

});

export default TestModal;
