import { View } from "react-native";
import TestHeader from "../Header";
import StepCountButton from "./StepCountButton";

const StepCounterHome=()=>{
    return(
        <View>
            <TestHeader name={"Step Counter"}/>
            <StepCountButton/>
        </View>

    );
};

export default StepCounterHome;