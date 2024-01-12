import { View ,StyleSheet} from "react-native";
import TestHeader from "../Header";
import StepCounterButton from "./StepCounterSelection";
import BreatingTestButton from "./BreatingTestSelection";

const TestSelection = () => {
  return (
    <View>
      <TestHeader name="Medical Test" />
      <View style={styles.container}>
        <StepCounterButton />
        <BreatingTestButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        margin: 50,
    },
});

export default TestSelection;
