import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components & Pages Import
import WelcomeScreen from "./src/screens/WelcomeScreen/WelcomeScreen";
import DoctorRegister from "./src/screens/AuthenticationScreens/DoctorAuthentication/DoctorRegister";
import PatientRegister from "./src/screens/AuthenticationScreens/PatientAuthentication/PatientRegister";
import PatientLogin from "./src/screens/AuthenticationScreens/PatientAuthentication/PatientLogin";
import PatientDashboard from "./src/screens/DashboardScreens/PatientDashboard";
// import MedicalHistory from "./src/screens/MedicalHistory";
import TestSelection from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/TestSelectionHomeScreen";
import StepCounterHome from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/StepCounterScreen/StepCounterHomeScreen";
import BreathingHome from "./src/screens/MedicalTestHomeScreen/TestSelectionScreen/BreathingTestScreen/BreathingHomeScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import DoctorLogin from "./src/screens/AuthenticationScreens/DoctorAuthentication/DoctorLoginScreen";
import MedicalIncidentHomeScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentHomeScreen";
import MedicalIncidentDetailScreen from "./src/screens/AddMedicalIncidentScreen/MedicalIncidentDetailScreen";
import PatientsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsScreen";
import PatientProfileScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientprofileScreen";
import PatientHistoryScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/PatientsHistoryScreen";
import DoctorDashboard from "./src/screens/DashboardScreens/DoctorDashboard";
import SelectDocForAccessScreen from "./src/screens/GiveDocAccess/SelectDocForAccessScreen";
import GiveDocAccessScreen from "./src/screens/GiveDocAccess/GiveDocAccessScreen";
import CustomHeader from "./src/screens/ViewPatientSummaryHome Screen/Components/CustomHeader";
import MedicalIdFalseScreen from "./src/screens/AuthenticationScreens/DoctorAuthentication/MedicalIdFalseScreen";
import Header from "./src/components/Header";
import MedicationView from "./src/screens/MedicationToCalendar/MedicationViewInCalendarHome";
import MedicationsScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/MedicationsScreen";
import AddMedication from "./src/screens/MedicationToCalendar/pages/Add&Edit_MedicationPage";
import ViewMedication from "./src/screens/MedicationToCalendar/pages/ViewDailyMedicationPage";
import ViewPastEntries from "./src/screens/MedicationToCalendar/pages/ViewPastEntriesPage";
import NewMedicalRecordScreen from "./src/screens/AddMedicalRecordScreen/NewMedicalRecordScreen";
import MyprofileScreen from "./src/screens/PatientMyProfileScreen/MyprofileScreen";
import DoctorProfileScreen from "./src/screens/DoctorMyProfileScreen/DoctorProfileScreen";
import BodyCompositionScreen from "./src/screens/BodyComposition/BodyCompositionScreen";
import TestResultScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/TestResultScreen";
import AddExternalTestResults from "./src/screens/ExternalTestResults/AddExternalTestResults/AddExternalTestResults";
import ViewExternalTestResults from "./src/screens/ExternalTestResults/ViewExternalTestResults/ViewExternalTestResult";
import ForgotPassword from "./src/screens/AuthenticationScreens/FogotPassword";
import ResetPasswordScreen from "./src/screens/AuthenticationScreens/ResetPassword";
import OTPVerificationScreen from "./src/screens/AuthenticationScreens/OtpVerify";
import DisplayMedicalRecords from "./src/screens/AddMedicalRecordScreen/DisplayMedicalRecords";
import OtpVerifyScreen from "./src/screens/AuthenticationScreens/PatientAuthentication/OtpVerifyPatient";
import ContactPatientScreen from "./src/screens/ViewPatientSummaryHome Screen/PatientSummaryScreen/ContactPatientScreen";
import DocAccessHomeScreen from "./src/screens/GiveDocAccess/DocAccessHomeScreen";
import ViewDoctorsWithAccess from "./src/screens/GiveDocAccess/ViewDoctorsWithAccess";

import { useAuthContext } from "./src/hooks/useAuthContext";

const Stack = createNativeStackNavigator();

export default function Routing() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        // initialRouteName="DoctorDashboard"
        // initialRouteName="PatientDashboard"

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

        {/* Authentication Screens */}

        <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen name="DoctorRegister" component={DoctorRegister} />
        {/* <Stack.Screen
          name="MedicalIdFalseScreen"
          component={MedicalIdFalseScreen}
        /> */}
        <Stack.Screen
          name="MedicalIdFalseScreen"
          component={MedicalIdFalseScreen}
        />
        <Stack.Screen name="PatientRegister" component={PatientRegister} />
        <Stack.Screen name="PatientLogin" component={PatientLogin} />

        {/* * Patient Screens * */}

        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
        {/* <Stack.Screen name="MedicalHistory" component={MedicalHistory} /> */}

        <Stack.Screen name="TestSelection" component={TestSelection} />
        <Stack.Screen name="StepCounterHome" component={StepCounterHome} />
        <Stack.Screen name="BreathingHome" component={BreathingHome} />

        <Stack.Screen
          name="NewMedicalRecordScreen"
          component={NewMedicalRecordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DisplayMedicalRecords"
          component={DisplayMedicalRecords}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicalIncidentHomeScreen"
          component={MedicalIncidentHomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SelectDocForAccessScreen"
          component={SelectDocForAccessScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="ViewDoctorsWithAccess"
          component={ViewDoctorsWithAccess}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DocAccessHomeScreen"
          component={DocAccessHomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GiveDocAccessScreen"
          component={GiveDocAccessScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="MedicationView" component={MedicationView} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="ViewMedication" component={ViewMedication} />
        <Stack.Screen name="ViewPastEntries" component={ViewPastEntries} />

        <Stack.Screen
          name="MyprofileScreen"
          component={MyprofileScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BodyCompositionScreen"
          component={BodyCompositionScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DoctorProfileScreen"
          component={DoctorProfileScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddExternalTestResults"
          component={AddExternalTestResults}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ViewExternalTestResults"
          component={ViewExternalTestResults}
          options={{ headerShown: false }}
        />

        {/* Doctor Screens */}
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />

        <Stack.Screen
          name="PatientsScreen"
          component={PatientsScreen}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="TestResultScreen"
          component={TestResultScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactPatientScreen"
          component={ContactPatientScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MedicationsScreen"
          component={MedicationsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OTPVerificationScreen"
          component={OTPVerificationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OtpVerifyScreen"
          component={OtpVerifyScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} /> */}

        {/* <Stack.Screen
          name="MedicalIdFalseScreen"
          component={MedicalIdFalseScreen}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen name="ContactUs" component={ContactUs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
