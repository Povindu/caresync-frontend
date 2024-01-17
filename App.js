import { StatusBar } from 'expo-status-bar';
import {  StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import PatientsScreen from './Screens/PatientsScreen';
import CustomHeader from './Components/CustomHeader';

import PatientProfileScreen from './Screens/PatientprofileScreen';
import PatientHistoryScreen from './Screens/PatientsHistoryScreen';

const Stack=createNativeStackNavigator();
export default function App() {
  return (

    <>
    <StatusBar color={'light'}></StatusBar>
    <NavigationContainer>
    <Stack.Navigator
          
        >
          <Stack.Screen
            name="PatientsScreen"
            component={PatientsScreen}
            options={{
              header: (props) => <CustomHeader {...props} />,
            }}
          />
          <Stack.Screen
            name="PatientProfileScreen"
            component={PatientProfileScreen}
            options={{
              headerShown: false ,
         
            
           
            }}
          />
    
          <Stack.Screen
            name="PatientHistoryScreen"
            component={PatientHistoryScreen}
            options={{
              headerShown: false ,
         
            
           
            }}
          />
        </Stack.Navigator>
   
    </NavigationContainer>
    
    </>
     
  );
}

const styles = StyleSheet.create({
 

});
