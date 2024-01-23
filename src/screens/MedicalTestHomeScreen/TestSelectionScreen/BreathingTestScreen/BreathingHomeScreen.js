import { View } from "react-native";
import Header from "../../../../components/Header";
import HoldButton from "./BreatingTestButtonCom";
import BreathingTestDataStore from "./BreathingTestDataStore";

const BreathingHome=()=>{
    return(
        <View>
            <Header name="Breathing Test"/>
            <HoldButton/>
            <BreathingTestDataStore/>
        </View>

    );
};

export default BreathingHome;