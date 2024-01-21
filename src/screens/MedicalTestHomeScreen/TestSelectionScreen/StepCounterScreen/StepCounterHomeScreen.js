import { View } from "react-native";
import TestHeader from "../../../../components/Header";
import StepCountButton from "./StepCountButtonCom";
import StepCount from "./StepCountCom";

const StepCounterHome=()=>{
    return(
        <View>
            <TestHeader name={"Step Counter"}/>
            <StepCount/>
            <StepCountButton/>
        </View>

    );
};

export default StepCounterHome;