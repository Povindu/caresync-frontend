import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import MedicationScreen from "../PatientSummaryScreen/MedicationsScreen";

function PatientSummary({
  id,
  firstName,
  lastName,
  blood,
  email,
  weight,
  height,
  gender,
  nic,
}) {
  return (
    <View style={styles.innerContainer}>
      <View style={styles.first}>
        <View style={styles.tid}>
          <Text style={styles.title}>
            {firstName} {lastName}
          </Text>
        </View>

        <View style={styles.main1}>
          <View style={styles.cat1}>
            <Text style={styles.text1}> NIC</Text>
            <Text style={styles.nic}>{nic}</Text>
          </View>
          <View style={styles.cat2}>
            <Text style={styles.text2}> Gender</Text>
            <Text style={styles.gender}>{gender}</Text>
          </View>
        </View>
        <View style={styles.main2}>
          <View style={styles.categaryDown}>
            <Text style={styles.TextLineDownweight}>Weight</Text>
            <Text style={styles.weight}>{weight} kg</Text>
          </View>
          <View style={styles.categaryDown}>
            <Text style={styles.TextLineDownheight}>Height</Text>
            <Text style={styles.Height}>{height} cm</Text>
          </View>
          <View style={styles.categaryDown}>
            <Text style={styles.TextLineDownblood}>Blood Group</Text>
            <Text style={styles.blood}>{blood}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default PatientSummary;
const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 15,
  },
  first: {
    justifyContent: "center",
    alignItems: "center",
  },
  tid: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,

    width: 50,
    height: 50,
  },

  content: {
    flexDirection: "row",
  },
  nic: {
    fontSize: 20,
    marginLeft: 10,
    color: "#00567D",
    fontWeight: "bold",
  },
  gender: {
    fontSize: 20,
    marginLeft: 60,
    color: "#00567D",
    fontWeight: "bold",
  },

  id: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 150,
  },
  id2: {
    fontSize: 20,
    marginLeft: 70,
    color: "#00567D",
    fontWeight: "bold",
  },
  cat1: {
    flexDirection: "column",
  },
  categaryDown: {
    flexDirection: "column",
  },
  text1: {
    fontSize: 15,
    marginLeft: 60,
  },
  cat2: {
    flexDirection: "column",
  },
  main1: {
    flexDirection: "row",
    marginTop: 20,
    marginRight: "10%",
    position: "relative",
  },
  cat3: {
    flexDirection: "column",
    marginLeft: 50,
  },
  weight: {
    fontSize: 20,
    color: "#00567D",
    fontWeight: "bold",
    marginLeft: 120,
  },
  Height: {
    fontSize: 20,
    color: "#00567D",
    fontWeight: "bold",
    marginLeft: 50,
  },
  blood: {
    fontSize: 20,
    color: "#00567D",
    fontWeight: "bold",
    marginLeft: 70,
  },

  text2: {
    fontSize: 15,
    marginLeft: 55,
  },
  text2: {
    fontSize: 15,
    marginLeft: 55,
  },
  text3: {
    fontSize: 15,
  },

  main2: {
    flexDirection: "row",
    marginTop: 20,
    marginRight: "22%",
  },
  cat4: {
    flexDirection: "column",
    marginLeft: 30,
  },
  cat5: {
    flexDirection: "column",
  },

  text4: {
    fontSize: 15,
    marginLeft: 40,
  },

  text5: {
    fontSize: 15,
    marginLeft: 60,
  },
  TextLineDownweight: {
    fontSize: 15,
    marginLeft: 120,
  },
  TextLineDownheight: {
    fontSize: 15,
    marginLeft: 60,
  },
  TextLineDownblood: {
    fontSize: 15,
    marginLeft: 40,
  },
});
