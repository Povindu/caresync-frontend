import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MedicalHistory = () => {
  const [breathingExpanded, setBreathingExpanded] = useState(false);
  const [coughExpanded, setCoughExpanded] = useState(false);

  const toggleBreathingExpand = () => {
    setBreathingExpanded(!breathingExpanded);
    setCoughExpanded(false);
  };

  const toggleCoughExpand = () => {
    setBreathingExpanded(false);
    setCoughExpanded(!coughExpanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <Text style={styles.titleMain}>Medical History</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Image source={require('../../assets/Vector.png')} style={styles.searchImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.medicalDataContainer} onPress={toggleBreathingExpand}>
        <Text style={styles.medicalDataTitle}>Breathing Issues</Text>
        {breathingExpanded && (
          <View style={styles.expandedMedicalData}>
            <Text>12 Nov 2023: Hard to breathe</Text>
            <Text>12 Nov 2023: Dr. Manusha appointment</Text>
            <Text>13 Nov 2023: Hard to breathe</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.medicalDataContainer} onPress={toggleCoughExpand}>
        <Text style={styles.medicalDataTitle}>Cough</Text>
        {coughExpanded && (
          <View style={styles.expandedMedicalData}>
            <Text>12 Nov 2023: Persistent cough</Text>
            <Text>14 Nov 2023: Dr. Smith appointment</Text>
            <Text>15 Nov 2023: Cough with phlegm</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add button pressed')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FEFF',
  },
  topPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 95,
    backgroundColor: '#00567D',
    paddingHorizontal: 15,
  },
  titleMain: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 60,
    height: 40,
  },
  searchImage: {
    width: '60%',
    height: '90%',
  },
  medicalDataContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  medicalDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expandedMedicalData: {
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#3498db',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MedicalHistory;
