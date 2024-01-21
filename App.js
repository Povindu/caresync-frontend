
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TestSelection from "./CareSyncMedicalTest/TestSelectionPage/TestSelection"
import StepCounterHome from "./CareSyncMedicalTest/StepCounterPage/StepCounterHome";
import BreathingHome from "./CareSyncMedicalTest/BreathingTestPage/BreathingHome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TestSelection"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="TestSelection" component={TestSelection} />
            <Stack.Screen name="StepCounterHome" component={StepCounterHome} />
            <Stack.Screen name="BreathingHome" component={BreathingHome} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
