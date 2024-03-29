import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DisplayTime from "../../components/StopwatchDisplay";
import BreathingTestDataStore from "./BreathingTestDataStore";
import axios from "axios";

import { baseUrl } from "../../../../constants/constants";

const HoldButton = () => {
  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number); //display two digits 0-9

  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  let sDate = `${padtoTwo(date)}/${padtoTwo(month)}/${year}`; //set date 29/04/2024 format
  const [isPressing, setIsPressing] = useState(false); //press the button or not, default not
  const [result, setResult] = useState([]); //store breathing test results
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const intervalRef = useRef(null); //get interval reference in time

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  //load when start
  useEffect(() => {
    getResults();
  }, []);

  //integrate get result API
  const getResults = () => {
    axios
      .get(`${baseUrl}/breathingTests`)
      .then((response) => {
        setResult(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //post result API integration
  const addResults = (data) => {
    const payload = {
      date: data.date,
      stopwatchTime: data.stopwatchTime,
    };
    axios
      .post(`${baseUrl}/breathingTests`, payload)
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //delete all results API integration
  const deleteResults = () => {
    axios
      .delete(`${baseUrl}/breathingTests`)
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //when button press and hold
  const handlePressIn = () => {
    setIsPressing(true);
    intervalRef.current = setInterval(run, 1000);
    console.log("Button pressed and held!");
  };

  //when button release
  const handlePressOut = () => {
    if (isPressing) {
      setIsPressing(false);
      console.log("Button released after being pressed and held!");
      showDecisionBox();
      clearInterval(intervalRef.current);
    }
  };
  const sTime = `${padtoTwo(updatedH)}:${padtoTwo(updatedM)}:${padtoTwo(
    updatedS
  )}`; //set time 00:00:00 format

  //alert when release the button
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
          addResults({ date: sDate, stopwatchTime: sTime });
          resetTime();
        },
      },
    ]);
  };

  //confirmation to delete table
  const deleteTableAlert = () => {
    Alert.alert("Delete Details", "Do you want to delete your test result?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel deletion");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          deleteResults();
          console.log("Delete Table");
        },
      },
    ]);
  };

  //stopwatch
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
          <TouchableOpacity
            onPress={deleteTableAlert}
            style={{ paddingBottom: 100 }}
          >
            <Text style={{ color: "#990000" }}>Reset</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
});

export default HoldButton;
