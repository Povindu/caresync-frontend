import { View, StyleSheet ,Text,TextInput, Pressable,SafeAreaView,} from "react-native";

import Header2 from "../AddMedicalIncidentScreen/components/Header2";
import Calendar from "../AddMedicalIncidentScreen/components/Calendar";
import Inputbar from "../AddMedicalIncidentScreen/components/Inputbar";




function MedicalIncidentHomeScreen({navigation}){
  function OnPressHandler(){
    navigation.navigate('MedicalIncidentDetailScreen')

  }
  
  return (
    <SafeAreaView >
     
        <Header2 text="Add Medical Incident"/>
        <View style={styles.background}>
          <View style={styles.container}>
            <Inputbar text1="Incident Name" placeholder="Add Incident name here"/>
            <Inputbar text1="Incident Description" placeholder="Add incident description here"  />
            
        
            <Calendar />
          
          <Pressable style={styles.btn} onPress={OnPressHandler}>
            <Text style={styles.txtbtn}>Next</Text>
          </Pressable>
          </View>
        </View>
     
      </SafeAreaView>
    
  );
}
export default MedicalIncidentHomeScreen;

const styles = StyleSheet.create({

    
    text2:{
      marginLeft: 80,
      marginTop:50,
      fontSize: 20,
      color:'#1e1e1e',
    },
  
  
    container: {
      flexDirection: 'column',
      width: '100%',
      height:'76%',
      backgroundColor: '#FFFF',
      
  
    },
  
    background: {
      backgroundColor: '#DEFFFB',
      width: '100%',
      height: '100%',
      padding: 15,
      
      
    },
  
    
    input2:{
      borderColor: '#8e8e8e',
      borderWidth:1,
      padding:10,
      width:'88%',
      height:94,
      margin:20,
      marginTop:10,
     borderRadius:10,
      textAlignVertical: 'top',
      fontSize:16,
      
    },
    txtbtn:{
      color:'#FFF',
      padding:8,
      fontSize:16,
      
    },
    btn:{
      backgroundColor:'#00567D',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:10,
      maxWidth:'100%',
      padding:2,

    }

   
    }
  );
  
   
  
  
      
  