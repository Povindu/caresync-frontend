import { View, StyleSheet, Text, TextInput, Pressable, SafeAreaView, } from "react-native";
import Inputbar from "../AddMedicalIncidentScreen/components/Inputbar";
import Header from "../../components/Header";
import Btn from "../AddMedicalIncidentScreen/components/Btn";

const NewMedicalRecordScreen = ({navigation}) => {
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
          
        </View>
       <View style={styles.box2}>
       <Btn
            navigation={navigation}
            text="Add New"
            screenName="MedicalIncidentHomeScreen"
          />
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

  background: {
    backgroundColor: '#DEFFFB',
    width: '100%',
    height: '100%',
    padding: 15,
  },

 
}
);





