import { View, StyleSheet ,Text, Pressable, SafeAreaView} from "react-native";
import Header from "../../components/Header"


function GiveDocAccess({navigation,route}){
    
  // function OnPressHandler(){
  //   navigation.navigate('MedicalIncidentDetailScreen')
  // }
  
  return (

    <SafeAreaView >
      <Header name={"Grant Access"}/>
        <View style={styles.background}>
        <Text>Doctor Details</Text>
          <View style={styles.card}>
            <Text>Name: {route.params.name}</Text>
            <Text>ID:{route.params.id}</Text>
          </View>
          <View>
            <Pressable>
              <Text>Grant Access Button</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    
  );
}
export default GiveDocAccess;

const styles = StyleSheet.create({
  
    background: {
      backgroundColor: '#DEFFFB',
      width: '100%',
      height: '100%',
      padding: 15,
      
      
    },

    card:{
      backgroundColor: '#8e8e8e',
      borderRadius: 20,
      padding: 20
    }

   
    }
  );
  
  