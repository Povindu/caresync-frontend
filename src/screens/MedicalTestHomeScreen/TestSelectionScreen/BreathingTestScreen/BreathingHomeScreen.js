import { View, ScrollView } from "react-native";
import Header from "../../../../components/Header";
import HoldButton from "./BreatingTestButtonCom";

const BreathingHome = () => {
  return (
    <View>
      <Header name="Breathing Test" />
      <ScrollView>
        <HoldButton />
      </ScrollView>
    </View>
  );
};

export default BreathingHome;
