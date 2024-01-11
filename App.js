import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import DoctorLogin from "./src/screens/DoctorLoginScreen";
import ContactUs from "./src/screens/ContactUs";
import DoctorRegister from "./src/screens/DoctorRegister";
import PatientRegister from "./src/screens/PatientRegister";
import PatientLogin from "./src/screens/PatientLogin";
import PatientDashboard from "./src/screens/PatientDashboard";
import MedicalHistory from "./src/screens/MedicalHistory";
import TestSelection from "./src/screens/TestSelectionPage/TestSelection";
import StepCounterHome from "./src/screens/StepCounterPage/StepCounterHome";
import BreathingHome from "./src/screens/BreathingTestPage/BreathingHome";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerStyle: { backgroundColor: "#FBDABB" } }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="DoctorRegister" component={DoctorRegister} />
        <Stack.Screen name="PatientRegister" component={PatientRegister} />
        <Stack.Screen name="PatientLogin" component={PatientLogin} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
        <Stack.Screen name="TestSelection" component={TestSelection} />
        <Stack.Screen name="StepCounterHome" component={StepCounterHome} />
        <Stack.Screen name="BreathingHome" component={BreathingHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
