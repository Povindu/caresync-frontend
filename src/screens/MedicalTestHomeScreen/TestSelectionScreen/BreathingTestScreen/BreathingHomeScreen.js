import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import Header from "../../../../components/Header";
import Control from "./Control";
import BreathingTestDataStore from "./BreathingTestDataStore";
import { displayTime } from "./Util";

export default function BreathingHome() {
  const [time, setTime] = useState(0);
  const [isPressing, setPressing] = useState(false);
  const [results, setResults] = useState([]);
  const timer = useRef(null);

  const handlePressIn = useCallback(() => {
    if (!isPressing) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 1000);
      timer.current = interval;
    }
    setPressing((previousState) => !previousState);
  }, [isPressing]);

  const handlePressOut = useCallback(() => {
    clearInterval(timer.current);
    showDecisionBox();
  }, [isPressing]);

  const saveRecord =
    (() => {
      if (isPressing) {
        setResults((previousResults) => [time, ...previousResults]);
      }
    },
    [isPressing, time]);

  const showDecisionBox = () => {
    Alert.alert("Save Details", "Do you want to save your test result?", [
      {
        text: "Cancel",
        onPress: () => {
          setTime(0);
        },
      },
      {
        text: "Save",
        onPress: () => {
          saveRecord();
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <Header name="Breathing Test" />
      <View>
        <Text>{displayTime(setTime)}</Text>
      </View>
      <View>
        <Control
          isPressing={isPressing}
          handlePressIn={handlePressIn}
          handlePressOut={handlePressOut}
        />
      </View>
      <View>
        <BreathingTestDataStore results={results} />
      </View>
    </SafeAreaView>
  );
};

