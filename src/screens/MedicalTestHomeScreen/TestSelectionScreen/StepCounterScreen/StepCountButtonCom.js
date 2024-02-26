import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import DisplayTime from "../../../../components/StopwatchDisplay";
import StepCountDataStore from "./StepCountDataStore";
import {Pedometer} from "expo-sensors"

const StepCountButton = () => {
  useEffect(() => {
    subscribe();
  }, []);

  const padtoTwo =(number) =>(number<=9 ? `0${number}` : number);

  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  let sDate = `${padtoTwo(date)}/${padtoTwo(month)}/${year}`;

  const [result, setResult] = useState([]);

  const [isStarted, setIsStarted] = useState(false);

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });

  const intervalRef = useRef(null);

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const sTime=   `${padtoTwo(updatedH)}:${padtoTwo(updatedM)}:${padtoTwo(updatedS)}`
  
  const handleButtonClick = () => {
    if (isStarted) {
      clearInterval(intervalRef.current);
      saveData();
      resetTime();
      setstepcount(0);
      console.log("Stoped");
    } else {
      intervalRef.current = setInterval(run, 1000);
      console.log("Started");
    }
    setIsStarted(!isStarted);
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

  const saveData = () => {
    console.log(updatedH,updatedM,updatedS);
    console.log(sDate);
    setResult((prevResult) => [
      ...prevResult,
      {
        date: sDate,
        time: `${padtoTwo(updatedH)}:${padtoTwo(updatedM)}:${padtoTwo(
          updatedS
        )}`,
        steps: stepcount,
        distance: "0",
      },
    ]);
  };

  const resetTime = () => {
    setTime({ s: 0, m: 0, h: 0 });
  };

  const [pedoAvailability, setpedoAvailability] = useState("");

  const [stepcount, setstepcount] = useState(0);

  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setstepcount(result.steps);
    });
    Pedometer.isAvailableAsync().then(
      (result) => {
        setpedoAvailability(String(result));
      },
      (error) => {
        setpedoAvailability(error);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pedotext}>
        Is Pedometer available on the device : {pedoAvailability}
      </Text>
      <DisplayTime time={time} />
      <View style={styles.container1}>
        <Text style={styles.texts}>Steps : </Text>
        <Text style={styles.texts}>{stepcount}</Text>
    </View>
      <TouchableOpacity
        style={[styles.button, isStarted && styles.buttonClicked]}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>{isStarted ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
      <View style={styles.table}>
          <StepCountDataStore sampleData={result} />
        </View>
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
  buttonClicked: {
    backgroundColor: "#FFCACA",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  table:{
    width:"100%",
  },
  container1:{
    alignItems:'center',
    justifyContent:"center",
    display:"flex",
    flexDirection:"row",
    paddingBottom:10,
},
texts:{
    fontSize:26,
},
pedotext: {
  backgroundColor: "#FFCACA",
  padding: 3,
  marginTop: 2,
  fontWeight: "bold",
},
});
export default StepCountButton;