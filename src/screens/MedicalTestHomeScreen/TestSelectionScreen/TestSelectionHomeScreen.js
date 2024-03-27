import { View } from "react-native";
import Header from "../components/Header";
import StepCounterSelection from "./StepCounterSelectionCom";
import BreatingTestSelection from "./BreatingTestSelectionCom";

const TestSelection = ({ navigation }) => {
  return (
    //add header, stepcounter and breathing test selection components
    <View>
      <Header name="Medical Test" />
      <StepCounterSelection navigation={navigation} />
      <BreatingTestSelection navigation={navigation} />
    </View>
  );
};

export default TestSelection;
