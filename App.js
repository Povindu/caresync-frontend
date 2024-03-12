import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MedicalIncidentHomeScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentHomeScreen";
import MedicalIncidentDetailScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentDetailScreen";
import PatientsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsScreen";
import PatientProfileScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientprofileScreen";
import PatientHistoryScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsHistoryScreen";
import DoctorDashboard from "./src/screens/DoctorDashboard";
import CustomHeader from "./src/screens/ViewPatientSummaryHome Screen/Components/CustomHeader";
import MedicalIdFalseScreen from "./src/screens/MedicalIdFalseScreen";
import Header from "./src/components/Header";
import MedicationView from "./src/screens/MedicationToCalendar/MedicationViewInCalendarHome";

import MedicationsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/MedicationsScreen";

import AddMedication from "./src/screens/MedicationToCalendar/AddMedicationPage"
import ViewMedication from "./src/screens/MedicationToCalendar/ViewMedicationPage";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
             initialRouteName="HomeScreen"
             screenOptions={{ headerStyle: { backgroundColor: "#FBDABB" },headerShown: false }}
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
            <Stack.Screen
              name="PatientDashboard"
              component={PatientDashboard}
            />
                
            <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
            <Stack.Screen name="TestSelection" component={TestSelection} />
            <Stack.Screen name="StepCounterHome" component={StepCounterHome} />
            <Stack.Screen name="BreathingHome" component={BreathingHome} />
            <Stack.Screen name="MedicationView" component={MedicationView}/>
            <Stack.Screen name="AddMedication" component={AddMedication}/>
            <Stack.Screen name="ViewMedication" component={ViewMedication}/>

            <Stack.Screen name="MedicalIncidentHomeScreen" component={MedicalIncidentHomeScreen} options={{ headerShown:false}}/>
            <Stack.Screen name="MedicalIncidentDetailScreen" component={MedicalIncidentDetailScreen} options={{ headerShown:false}}/>

       

            <Stack.Screen
            name="PatientsScreen"
            component={PatientsScreen}
            options={{
              headerShown: false ,
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
            <Stack.Screen
            name="MedicationsScreen"
            component={MedicationsScreen}
            options={{
              headerShown: false ,
            }}
          />
           <Stack.Screen
              name="DoctorDashboard"
              component={DoctorDashboard}
            />
            <Stack.Screen
              name="MedicalIdFalseScreen"
              component={MedicalIdFalseScreen}
              options={{ headerShown: false }}
            />



          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
};
