import { StatusBar } from 'expo-status-bar';
import {  StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import PatientsScreen from './Screens/PatientsScreen';
import CustomHeader from './Components/CustomHeader';

const Stack=createNativeStackNavigator();
export default function App() {
  return (

    <>
    <StatusBar color={'light'}></StatusBar>
    <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />, 
        }}
      >
        <Stack.Screen
          name="PatientsScreen"
          component={PatientsScreen}
          
       
        />
        
      </Stack.Navigator> 
   
    </NavigationContainer>
    </>
     
  );
}

const styles = StyleSheet.create({
 

});
