import { View } from "react-native";
import TestHeader from "../../components/Header";
import HoldButton from "./BreatingTestButton";

const BreathingHome=()=>{
    return(
        <View>
            <TestHeader name="Breathing Test"/>
            <HoldButton/>
        </View>

    );
};

export default BreathingHome;