import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

const StepCountDataStore = ({sampleData}) => {
  if(!sampleData){
    return null;
  }
  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.headtext}>Past Results</Text>
      <DataTable style={{ width: "100%" }}>
        <DataTable.Header>
        <DataTable.Title style={{ justifyContent: "center" }}>
            Date
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            Time (H:M:S)
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            Steps
          </DataTable.Title>
        </DataTable.Header>

        {sampleData.map((data, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ justifyContent: "center" }}>
              {data.date}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "center" }}>
              {data.time}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "center" }}>
              {data.steps}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
    <View style={styles.resetTable}>
    <Text style={{ color: "#990000" }} onPress={()=>{}}>Reset</Text>
  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEFFFB",
    marginTop: 10,
    margin: "5%",
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

export default StepCountDataStore;
