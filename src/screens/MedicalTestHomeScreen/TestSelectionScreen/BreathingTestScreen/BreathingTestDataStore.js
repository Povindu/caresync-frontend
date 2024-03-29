import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

const BreathingTestDataStore = ({ sampleData }) => {
  //no data return null
  if (!sampleData) {
    return null;
  }
  return (
    //table which store breathing test result, map to relevant data
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
        {sampleData.map((data, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ justifyContent: "center" }}>
              {data.date}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "center" }}>
              {data.stopwatchTime}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
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
});

export default BreathingTestDataStore;
