import { Text, StyleSheet, FlatList, View, ScrollView } from "react-native";
import Header2 from "../Components/Header2";
import BreathingTest from "../Components/BreathingTest";
import StepCounterTest from "../Components/StepCounterTest";

function TestResultScreen({ route, navigation }) {
  const PID = route.params.PID;
  return (
    <View style={styles.container}>
      <Header2 text="Test Results" />
      <View style={styles.subcontainer}>
        <ScrollView>
          <BreathingTest PID={PID} />
          <StepCounterTest PID={PID} />
        </ScrollView>
      </View>
    </View>
  );
}
export default TestResultScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F7FF",
  },
  subcontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
