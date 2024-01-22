import { View } from "react-native";
import TestHeader from "../../../../components/Header";
import StepCountButton from "./StepCountButtonCom";
import StepCount from "./StepCountCom";
import DisplayTime from "../../../../components/StopwatchDisplay";

const StepCounterHome=()=>{
    return(
        <View>
            <TestHeader name={"Step Counter"}/>
            <StepCountButton/>
        </View>

    );
};

export default StepCounterHome;