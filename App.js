import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image,SafeAreaView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Header from './Components/Header';
import MedicalIncidentScreen from './Screens/MedicalIncidentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicalIncidentDetailScreen from './Screens/MedicalIncidentDetailScreen';
const Stack=createNativeStackNavigator();

export default function App() {
  
  return (
    <>
   
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="MedicalIncidentScreen"
        component={MedicalIncidentScreen}
        options={{
          headerShown:false
        }}>

        </Stack.Screen>
        
        <Stack.Screen
        name="MedicalIncidentDetailScreen"
        component={MedicalIncidentDetailScreen}
        options={{
          headerShown:false
        }}>

        </Stack.Screen>
      </Stack.Navigator>
    


    
    
    </NavigationContainer>
  
    </>


         
     
)}


const styles = StyleSheet.create({

  
 
  }
);

 


    
