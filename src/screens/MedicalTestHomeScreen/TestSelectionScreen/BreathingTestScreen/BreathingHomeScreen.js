import { View } from "react-native";
import TestHeader from "../../../../components/Header";
import HoldButton from "./BreatingTestButtonCom";
import DisplayTime from "../../../../components/StopwatchDisplay";

const BreathingHome=()=>{
    return(
        <View>
            <TestHeader name="Breathing Test"/>
            <HoldButton/>
        </View>

    );
};

export default BreathingHome;