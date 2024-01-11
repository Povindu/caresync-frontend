import * as React from 'react';
import { StyleSheet,View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Screen1 from './src/screens/Screen1';
// import Screen2 from './src/screens/Screen2';
import HomeScreen from "./src/screens/HomeScreen";
import DoctorLogin from "./src/screens/DoctorLoginScreen";
import ContactUs from "./src/screens/ContactUs";
import DoctorRegister from "./src/screens/DoctorRegister";
import PatientRegister from "./src/screens/PatientRegister";
import PatientLogin from "./src/screens/PatientLogin";
import PatientDashboard from "./src/screens/PatientDashboard";
import MedicalHistory from "./src/screens/MedicalHistory";


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerStyle: { backgroundColor: '#FBDABB' } }}>
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="DoctorLogin" 
          component={DoctorLogin} 
        />
        <Stack.Screen 
          name="ContactUs" 
          component={ContactUs} 
        />
        <Stack.Screen 
          name="DoctorRegister" 
          component={DoctorRegister} 
        />
        <Stack.Screen 
          name="PatientRegister" 
          component={PatientRegister} 
        />
        <Stack.Screen 
          name="PatientLogin" 
          component={PatientLogin} 
        />
        <Stack.Screen 
          name="PatientDashboard" 
          component={PatientDashboard} 
        />
        <Stack.Screen 
          name="MedicalHistory" 
          component={MedicalHistory} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
