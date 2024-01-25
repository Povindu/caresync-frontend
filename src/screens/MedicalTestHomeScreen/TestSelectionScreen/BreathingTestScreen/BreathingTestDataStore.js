import * as React from "react";
import { View, StyleSheet, Text , ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { displayTime } from "./Util";

const BreathingTestDataStore = ({results}) => {
  const sDate = new Date().toDateString();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headtext}>Past Results</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Test Date
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Time (H:M:S)
            </DataTable.Title>
          </DataTable.Header>

          {results.map((data, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {sDate}
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {displayTime(data)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View style={styles.resetTable}>
        <Text style={{ color: "#990000" }}>Reset</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFFFB",
    marginTop: 10,
    margin: "10%",
    borderRadius: 20,
  },
  headtext: {
    fontSize: 25,
    padding: 10,
    paddingBottom: 0,
  },
  resetTable: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BreathingTestDataStore;
