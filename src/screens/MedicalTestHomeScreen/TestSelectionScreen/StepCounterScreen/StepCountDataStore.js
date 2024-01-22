import * as React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { DataTable } from 'react-native-paper';

const StepCountDataStore = ()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.headtext}>Past Results</Text>
            <DataTable style={{width:"100%"}}>
                <DataTable.Header >
                    <DataTable.Title style={{justifyContent:"center"}}>Number of Steps</DataTable.Title>
                    <DataTable.Title style={{justifyContent:"center"}}>Time (H:M:S)</DataTable.Title>
                </DataTable.Header>
            </DataTable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#DEFFFB",
        marginTop:10,
        margin:"10%",
        borderRadius:20,
      },
      headtext:{
        fontSize:25,
        padding:10,
        paddingBottom:0,
      },
});

export default StepCountDataStore;