import React from "react";
import { View, StyleSheet, Text, TextInput, Pressable, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Inputbar from "../AddMedicalIncidentScreen/components/Inputbar";
import Header from "../../components/Header";
import PainRating from "../AddMedicalIncidentScreen/components/PainRating";


const NewMedicalRecordScreen = () => {
  const navigation = useNavigation();

  const handleAddNew = () => {
    navigation.navigate('MedicalIncidentHomeScreen');
  };
  

  return (
    <SafeAreaView >
      <Header name="Medical Record" />

      <View style={styles.background}>
        <View style={styles.container}>
       
          <Inputbar text1="Medical Record Name"
            placeholder="Enter Record Name Here"
          />
          <Inputbar text1="Description" placeholder="Enter description here"
          />
          <Inputbar text1="Weight" placeholder="Enter weight in kilo-grams here"
          />
           <Text style={styles.text1}>Appetite</Text>
        <PainRating text="Appetite" icon="gratipay"/>
       
          
        </View>
       <View style={styles.btn}>
         <Pressable onPress={handleAddNew}>
           <Text style={styles.btntext}>Add New</Text>
         </Pressable>
       </View>
       
         

      </View>

      
    </SafeAreaView>
  )

};
export default NewMedicalRecordScreen;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    width: '100%',
    height: '72%',
    backgroundColor: '#FFFF',
    
  },
  btn:{
    backgroundColor:'#00567D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    maxWidth:'100%',
    padding:2,

  },
  btntext:{
    color: '#FFF',
    padding:8,
    fontSize:16,
    
  },

  background: {
    backgroundColor: '#DEFFFB',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  text1: {
    marginLeft: 28,
    fontWeight:'500',
    fontSize: 16,
    color: '#1e1e1e',
  }
});
