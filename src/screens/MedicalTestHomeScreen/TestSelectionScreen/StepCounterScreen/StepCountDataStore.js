import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StepCountDataStore = ({sampleData, deleteOne}) => {
  if(!sampleData){
    return null;
  }
  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <Text style={styles.headtext}>Past Results</Text>
      <ScrollView horizontal={true}>
      <DataTable>
        <DataTable.Header>
        <DataTable.Title style={styles.headcellsStyle}>
            Date
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle1}>
            Time (H:M:S)
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle2}>
            Steps
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle3}>
            Distance
          </DataTable.Title>
          <DataTable.Title style={styles.headcellsStyle}>
            Calaries
          </DataTable.Title>
          <DataTable.Title>    </DataTable.Title>
        </DataTable.Header>
        {sampleData.length === 0 ? (
            <Text style={styles.textnoResults}>No past results</Text>
            ) : (
        sampleData.map((data, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.date}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle}>
              {data.stopwatchTime}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle1}>
              {data.steps}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle2}>
              {data.distance}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle3}>
              {data.calories}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellsStyle4}>
            <TouchableOpacity
                  onPress={() => {
                    //console.log(data._id)
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
</GestureHandlerRootView>
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
  cellsStyle: {
    paddingRight: 0,
    paddingLeft:0
  },
  cellsStyle1: {
    paddingRight: 0,
    paddingLeft:30
  },
  cellsStyle2: {
    marginRight:0,
    marginLeft:10,
    paddingRight: 30,
    paddingLeft:30
  },
  cellsStyle3: {
    marginRight:10,
    marginLeft:0,
    paddingRight: 0,
    paddingLeft:0
  },
  cellsStyle4: {
    marginLeft:0,
    paddingRight: 0,
    paddingLeft:0
  },
  headcellsStyle: {
    paddingRight: 30,
    paddingLeft: 10,
  },
  headcellsStyle1:{
    marginLeft:10
  },
  headcellsStyle2:{
    marginLeft:35,
    marginRight:10
  },
  headcellsStyle3:{
    marginLeft:30,
    marginRight:10
  },
  textnoResults:{
    padding:5,
    marginLeft:20
  }
});

export default StepCountDataStore;
