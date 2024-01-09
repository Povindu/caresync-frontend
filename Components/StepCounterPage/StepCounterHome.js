import { View } from "react-native";
import TestHeader from "../Header";
import StepCountButton from "./StepCountButton";
import StepCount from "./StepCount";

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