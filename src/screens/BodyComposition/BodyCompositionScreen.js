import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Header from "../../components/Header";
import WeightGraph from "./Components/WeightGraph";
import BMIGraph from "./Components/BMIGraph";
import BMIScale from "./Components/BMIScale";

function BodyCompositionScreen({}) {
  return (
    <View style={styles.container}>
      <Header name="Body Composition" />
      <ScrollView style={styles.subcontainer}>
        <View styles={styles.weightcontainer}>
          <Text style={styles.text}>Weight Composition </Text>
          <WeightGraph />
        </View>
        <View styles={styles.bmicontainer}>
          <Text style={styles.text}>BMI Composition</Text>
          <BMIGraph />
        </View>
      </ScrollView>
    </View>
  );
}

export default BodyCompositionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  weightcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: "#99d1f2",
    padding: 10,
    marginRight: 20,
    borderRadius: 20,
    // width: "50%",
  },
  bmicontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
