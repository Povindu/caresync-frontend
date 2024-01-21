import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const StepCountButton = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleButtonClick = () => {
    if (isStarted) {
        console.log("Stoped");
    } else {
        console.log("Started");
    }
    setIsStarted(!isStarted);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isStarted && styles.buttonClicked]}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>{isStarted ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 35,
    width: 220,
    height: 100,
    backgroundColor: "#D5FFCA",
    borderRadius: 5,
    borderRadius: 10,
  },
  buttonClicked: {
    backgroundColor: "#FFCACA",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});
export default StepCountButton;
