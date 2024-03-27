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

function PatientSummary({ id, firstName, lastName, nic, email }) {
  return (
    <View>
      <View style={styles.first}>
        <View style={styles.tid}>
          <Text style={styles.title}>
            {firstName} {lastName}
          </Text>
        </View>

        <View style={styles.main1}>
          <View style={styles.cat1}>
            <Text style={styles.text1}> Email</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <View style={styles.cat2}>
            <Text style={styles.text2}> NIC</Text>
            <Text style={styles.nic}>{nic}</Text>
          </View>
        </View>
        <View style={styles.main2}>
          <View style={styles.cat1}>
            <Text style={styles.id}>Patient ID</Text>
            <Text style={styles.id2}>{id}</Text>
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
  email: {
    fontSize: 20,
    marginLeft: 35,
    color: "#00567D",
    fontWeight: "bold",
  },
  nic: {
    fontSize: 20,
    marginLeft: 50,
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
  text1: {
    fontSize: 15,
    marginLeft: 80,
  },
  cat2: {
    flexDirection: "column",
  },
  main1: {
    flexDirection: "row",
    marginTop: 20,
    marginRight: "10%",
  },
  cat3: {
    flexDirection: "column",
    marginLeft: 50,
  },
  weight: {
    fontSize: 20,
    color: "#00567D",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 15,
    marginLeft: 60,
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
  height: {
    fontSize: 20,
    marginLeft: 50,
    color: "#00567D",
    fontWeight: "bold",
  },
  text4: {
    fontSize: 15,
    marginLeft: 40,
  },

  text5: {
    fontSize: 15,
    marginLeft: 60,
  },
});
