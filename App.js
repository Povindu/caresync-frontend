import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Header from './Components/Header';
import MedicalIncidentScreen from './Screens/MedicalIncidentScreen';

export default function App() {
  
  return (
    <View>
   
    <Header></Header>
    <MedicalIncidentScreen></MedicalIncidentScreen>
    
    </View>

         
     
)}


const styles = StyleSheet.create({

  
 
  }
);

 


    
