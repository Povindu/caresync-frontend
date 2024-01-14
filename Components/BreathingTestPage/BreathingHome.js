import { View } from "react-native";
import TestHeader from "../Header";
import HoldButton from "../BreathingTestPage/BreatingTestButton";

const BreathingHome=()=>{

    return(
        <View>
            <TestHeader name="Breathing Test"/>
            <HoldButton/>
        </View>

    );
};

export default BreathingHome;