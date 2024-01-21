import { View, StyleSheet ,Text,TextInput, Button, Pressable,SafeAreaView} from "react-native";
import DatePicker from 'react-native-modern-datepicker';
import Header from "../Components/Header";


function MedicalIncidentScreen({navigation}){
  function OnPressHandler(){
    navigation.navigate('MedicalIncidentDetailScreen')

  }
  
    return(
      <SafeAreaView>
      <View>
   
   <Header text="Add Medical Incident" />
        <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>Incident Name</Text>
          <TextInput
            style={styles.input1}
            placeholder="Enter the medical incident name here"
            placeholderTextColor="#8e8e8e"
          />
          <Text style={styles.text1}>Incident Description</Text>
          <TextInput
            style={styles.input2}
            placeholder="Enter the medical incident description here"
            placeholderTextColor="#8e8e8e"
          />
          <DatePicker></DatePicker>
          <Pressable style={styles.btn}  onPress={OnPressHandler}>
            <Text style={styles.txtbtn}>Next</Text></Pressable>
          </View>
          </View>
          </View>
          </SafeAreaView>

    )



}
export default MedicalIncidentScreen;

const styles = StyleSheet.create({

    text1: {
      marginLeft: 28,
      marginTop: 10,
      fontSize: 20,
      color:'#1e1e1e',
      // fontFamily: 'poppins regular,',
    },
    text2:{
      marginLeft: 80,
      marginTop:50,
      fontSize: 20,
      color:'#1e1e1e',
    },
  
  
    container: {
      width: 380,
      height: 537,
      backgroundColor: '#FFFF',
      margin: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
  
    },
  
    background: {
      backgroundColor: '#DEFFFB',
      width: '100%',
      height: '100%',
    },
  
    input1:{
      borderColor: '#8e8e8e',
      borderWidth:1,
      padding:10,
      width:341,
      height:38,
      margin:20,
      marginTop:10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      fontSize:16,
   },
    input2:{
      borderColor: '#8e8e8e',
      borderWidth:1,
      padding:10,
      width:341,
      height:94,
      margin:20,
      marginTop:10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
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
      marginTop:20,
      
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,

    }

   
    }
  );
  
   
  
  
      
  