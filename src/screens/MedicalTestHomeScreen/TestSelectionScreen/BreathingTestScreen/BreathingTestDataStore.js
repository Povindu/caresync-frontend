import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BreathingTestDataStore = ({ sampleData, deleteOne }) => {
  if (!sampleData) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headtext}>Past Results</Text>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.headcellsStyle}>
              Date
            </DataTable.Title>
            <DataTable.Title style={styles.headcellsStyle}>
              Time
            </DataTable.Title>
            <DataTable.Title style={styles.headcellsStyle}>
              Test Time
            </DataTable.Title>
            <DataTable.Title>      </DataTable.Title>
          </DataTable.Header>
          {sampleData.length === 0 ? (
            <Text style={styles.textnoResults}>No past results</Text>
            ) : (
          sampleData.map((data, id) => (
            <DataTable.Row key={id}>
              <DataTable.Cell style={styles.cellsStyle}>
                {data.date}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cellsStyle}>
                {data.systime}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cellsStyle}>
                {data.stopwatchTime}
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Data ID",data._id);
                    deleteOne(data._id);
                  }}
                >
                  <MaterialCommunityIcons name="delete-outline" color="red" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          )))}
        </DataTable>
      </ScrollView>
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
  cellsStyle: {
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 15,
  },
  headcellsStyle: {
    paddingRight: 30,
    paddingLeft: 20,
  },
  textnoResults:{
    padding:5,
    marginLeft:20
  }
});

export default BreathingTestDataStore;
