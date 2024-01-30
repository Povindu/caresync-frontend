import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DisplayTime from "../../../../components/StopwatchDisplay";
import BreathingTestDataStore from "./BreathingTestDataStore";

const HoldButton = () => {
  const [isPressing, setIsPressing] = useState(false);

  const [result, setResult] = useState([]);

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });

  const intervalRef = useRef(null);

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const handlePressIn = () => {
    setIsPressing(true);
    intervalRef.current = setInterval(run, 1000);
    console.log("Button pressed and held!");
  };

  const handlePressOut = () => {
    if (isPressing) {
      setIsPressing(false);
      console.log("Button released after being pressed and held!");
      showDecisionBox();
      clearInterval(intervalRef.current);
    }
  };

  const padtoTwo =(number) =>(number<=9 ? `0${number}` : number);

  const saveData = () => {
    console.log(updatedH,updatedM,updatedS);
    setResult((prevResult) => [...prevResult, { time: `${padtoTwo(updatedH)}:${padtoTwo(updatedM)}:${padtoTwo(updatedS)}` }]);
    resetTime();
  };

  const showDecisionBox = () => {
    Alert.alert("Save Details", "Do you want to save your test result?", [
      {
        text: "Cancel",
        onPress: () => {
          resetTime();
        },
      },
      {
        text: "Save",
        onPress: () => {
          saveData();
        },
      },
    ]);
  };

  const run = () => {
    if (updatedS === 60) {
      updatedS = 0;
      updatedM++;
    }
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    updatedS++;

    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const resetTime = () => {
    setTime({ s: 0, m: 0, h: 0 });
  };

  return (
    <ScrollView>
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
        <View style={styles.table}>
          <BreathingTestDataStore sampleData={result} />
        </View>
        <View style={styles.resetTable}>
          <Text style={{ color: "#990000" }}>Reset</Text>
        </View>
      </View>
    </ScrollView>
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
    marginTop: -45,
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
    color: "#F23939",
  },
  advice2: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    color: "black",
  },
  table: {
    width: "100%",
  },
  resetTable: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HoldButton;
