import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const HoldButton = () => {
  const [isPressing, setIsPressing] = useState(false);

  const handlePressIn = () => {
      setIsPressing(true);
      console.log('Button pressed and held!');
  };

  const handlePressOut = () => {
    if (isPressing) {
      setIsPressing(false);
      console.log('Button released after being pressed and held!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={[styles.button, isPressing && styles.buttonPressed]}>
          <Text style={styles.buttonText}>{isPressing ? "Release" : "Press and Hold"}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.advice1}>{isPressing ? "" : "Take a Deep Breath"}</Text>
      <Text style={styles.advice2}>{isPressing ? "" : "Press the Button while holding the breath"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding:35,
    width:220,
    height:100,
    backgroundColor: '#D5FFCA',
    borderRadius: 5,
    borderRadius:10,
  },
  buttonPressed: {
    backgroundColor: '#FFCACA',
  },
  buttonText: {
    fontSize:20,
    fontWeight:'bold',
    color: 'black',
    textAlign: 'center',
  },
  advice1:{
    fontSize: 18,
    fontWeight:'bold',
    paddingTop:10,
  },
  advice2:{
    fontSize: 16,
    paddingTop:5,
  },
});

export default HoldButton;