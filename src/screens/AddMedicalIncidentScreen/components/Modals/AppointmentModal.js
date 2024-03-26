import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView} from 'react-native';
import CustomDropdown from '../CustomDropdown';
import Inputbar from '../Inputbar';



const TestModal = ({ onClose }) => {
  const handleOKPress = () => {

  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Add Appoinment Details</Text>
      {/* <ScrollView style={styles.scrollview}> */}
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Purpose of the appoinment:</Text>
       
        
        <View style={styles.inputcontainer}>
        <Inputbar text1=""
            placeholder="Type the purpose "
          />
        </View>
        <Text style={styles.topic}>Helathcare provider's Details</Text>
        <Text style={styles.label}>Healthcare Provider's name</Text>
        <View style={styles.inputcontainer}>
        <Inputbar text1=""
            placeholder="Type Healthcare provider's name"
          />
          
        </View>
        <Text style={styles.label}>Healthcare provider's Contact No</Text>
       
        
        <View style={styles.inputcontainer}>
        <Inputbar text1=""
            placeholder="Type the Contact Number"
          />
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
    marginTop: '54%',
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
    top: 580,
  },
  buttonWrapper: {
    width: '40%', // Adjust as needed
  },
  label: {
    paddingTop: 40,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: '8%'
  },
  inputcontainer: {
    marginVertical: '-15%',
    paddingBottom:'10%'

  },

});

export default TestModal;
