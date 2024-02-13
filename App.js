import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen/WelcomeScreen";
import DoctorLogin from "./src/screens/DoctorLoginScreen";
import ContactUs from "./src/screens/ContactUs";
import DoctorRegister from "./src/screens/DoctorRegister";
import PatientRegister from "./src/screens/PatientRegister";
import PatientLogin from "./src/screens/PatientLogin";
import PatientDashboard from "./src/screens/PatientDashboard";
import MedicalHistory from "./src/screens/MedicalHistory";
import TestSelection from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/TestSelectionHomeScreen";
import StepCounterHome from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/StepCounterScreen/StepCounterHomeScreen";
import BreathingHome from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/BreathingTestScreen/BreathingHomeScreen";

import MedicalIncidentHomeScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentHomeScreen";
import MedicalIncidentDetailScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentDetailScreen";
import PatientsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsScreen";
import PatientProfileScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientprofileScreen";
import PatientHistoryScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsHistoryScreen";

import SelectDocForAccessScreen from "./src/screens/GiveDocAccess/SelectDocForAccessScreen";
import GiveDocAcessScreen from './src/screens/GiveDocAccess/GiveDocAccessScreen'

import DoctorDashboard from "./src/screens/DoctorDashboard";
import CustomHeader from "./src/screens/ViewPatientSummaryHome Screen/Components/CustomHeader";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerStyle: { backgroundColor: "#FBDABB" },
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
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

          <Stack.Screen
            name="MedicalIncidentHomeScreen"
            component={MedicalIncidentHomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MedicalIncidentDetailScreen"
            component={MedicalIncidentDetailScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SelectDocForAccessScreen"
            component={SelectDocForAccessScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GiveDocAccessScreen"
            component={GiveDocAcessScreen}
            options={{ headerShown: false }}
          />

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
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PatientHistoryScreen"
            component={PatientHistoryScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
