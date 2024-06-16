import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";

const Record_nameInputbar = ({ text1, placeholder }) => {
  // State to store the user input

  // Function to handle text input change
  const handleInputChange = (text) => {
    setRecName(text); // Update the inputValue state with the user input
  };

  return (
    <View style={styles.inputcontainer}>
      <Text style={styles.text1}>{text1}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={RecName} // Set the value of the input to the state value
        onChangeText={handleInputChange} // Call handleInputChange when the text changes
      ></TextInput>
    </View>
  );
};

export default Record_nameInputbar;

const styles = StyleSheet.create({
  inputcontainer: {
    paddingTop: "6%",
    justifyContent: "center",
  },
  text1: {
    marginLeft: 28,
    fontWeight: "500",
    fontSize: 16,
    color: "#1e1e1e",
  },
  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    width: "88%",
    height: 38,
    margin: 20,
    marginLeft: 25,
    borderRadius: 10,
    fontSize: 16,
  },
});
