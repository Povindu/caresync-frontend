// Home.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './homeStyles';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  return (
    <View style={styles.container}>

        <StatusBar style="auto" />  

        <Text style={styles.titleMain}>CareSync</Text>
    
      <Image
        source={require('../assets/HomeImage.png')}
        style={styles.logo}
      />

  
      <Text style={styles.title}>Select Account Type</Text>

 
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Patient</Text>
      </TouchableOpacity>

     
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default Home;
