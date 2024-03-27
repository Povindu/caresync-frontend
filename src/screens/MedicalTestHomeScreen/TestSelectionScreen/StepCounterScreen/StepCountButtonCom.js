import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import DisplayTime from "../../components/StopwatchDisplay";
import StepCountDataStore from "./StepCountDataStore";
import { Pedometer } from "expo-sensors";
import axios from "axios";
import CircularProgress from "react-native-circular-progress-indicator";

const StepCountButton = () => {
  //run when loading the app 
  useEffect(() => {
    subscribe();
    getResults();
  }, []);

  const padtoTwo = (number) => (number <= 9 ? `0${number}` : number); //show two digits 0-9

  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  let sDate = `${padtoTwo(date)}/${padtoTwo(month)}/${year}`; // set date 29/04/2024 structure
  const [result, setResult] = useState([]); //store step counter results
  const [isStarted, setIsStarted] = useState(false); //press button or not, default not
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 }); //to set time, default seconds minutes and hours zero
  const intervalRef = useRef(null); //to identify interval
  const [pedoAvailability, setpedoAvailability] = useState(""); //cheack pedometer available or not
  const [stepcount, setstepcount] = useState(0); //count steps

  //get distance using step count
  var dist = stepcount / 1300;
  var distance = dist.toFixed(4); //round off for 4 decimal places
  //get prop values to variables
  var updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const sTime = `${padtoTwo(updatedH)}:${padtoTwo(updatedM)}:${padtoTwo(updatedS)}`; //set time to 00:00:00 format

  //API integration for get results
  const getResults = () => {
    axios
      .get("http://10.10.14.139:4000/api/stepCounterTests")
      .then((response) => {
        setResult(response.data || []);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //API integration for post result
  const addResults = (data) => {
    const payload = {
      date: data.date,
      stopwatchTime: data.stopwatchTime,
      steps: data.steps,
      distance: data.distance,
    };
    axios
      .post("http://10.10.14.139:4000/api/stepCounterTests", payload)
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  //API integration for delete all results
  const deleteResults = () => {
    axios
      .delete("http://10.10.14.139:4000/api/stepCounterTests")
      .then(() => {
        getResults();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  const handleButtonClick = () => {
    if (isStarted) {
      clearInterval(intervalRef.current);
      addResults({
        date: sDate,
        stopwatchTime: sTime,
        steps: stepcount,
        distance: distance,
      });
      resetTime();
      setstepcount(0);
      console.log("Stoped");
    } else {
      intervalRef.current = setInterval(run, 1000); //get miliseconds in seconds 
      console.log("Started");
    }
    setIsStarted(!isStarted);
  };

  //stopwatch senario
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

  //function to pedometer actions
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

  //alert to confirmation delete table
  const showDecisionBox = () => {
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.pedotext}>
          Is Pedometer available on the device : {pedoAvailability}
        </Text>
        <DisplayTime time={time} />
        <View>
          <CircularProgress
            value={stepcount}
            maxValue={13000}
            radius={80}
            activeStrokeColor={"#00567D"}
            inActiveStrokeColor={"#DEFFFB"}
            inActiveStrokeWidth={20}
            activeStrokeWidth={20}
            title={"Step Count"}
            titleStyle={{ fontWeight: "bold" }}
          />
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
        <TouchableOpacity
          onPress={showDecisionBox}
          style={{ paddingBottom: 120 }}
        >
          <Text style={{ color: "#990000" }}>Reset</Text>
        </TouchableOpacity>
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
    marginTop: 10,
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
  table: {
    width: "100%",
  },
  pedotext: {
    backgroundColor: "#FFCACA",
    padding: 3,
    marginTop: 2,
    fontWeight: "bold",
  },
});
export default StepCountButton;
