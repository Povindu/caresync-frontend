import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

function Control({ isPressing, handlePressIn, handlePressOut}){
    return (
        <View style={styles.container}>
          <DisplayTime time={time} />
          <Text style={styles.advice1}>
            {isPressing ? "" : "Take a Deep Breath"}
          </Text>
          <Text style={styles.advice2}>
            {isPressing ? "" : "Press the Button while holding the breath"}
          </Text>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <View style={[styles.button, isPressing && styles.buttonPressed]}>
              <Text style={styles.buttonText}>
                {isPressing ? "Release" : "Press and Hold"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
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
    buttonPressed: {
      backgroundColor: "#FFCACA",
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
    },
    advice1: {
      fontSize: 18,
      fontWeight: "bold",
      color:"#F23939",
    },
    advice2: {
      fontSize: 16,
      paddingTop: 5,
      paddingBottom:10,
      color:"black",
    },
  });

  export default React.memo(Control);