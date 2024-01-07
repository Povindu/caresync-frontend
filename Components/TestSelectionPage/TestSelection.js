import { View } from "react-native";
import TestHeader from "../Header"
import StepCounterButton from "./StepCounterSelection";
import BreatingTestButton from "./BreatingTestSelection";


const TestSelection =()=>{
    return(
        <View>
        <TestHeader name="Medical Test"/>
        <StepCounterButton/>
        <BreatingTestButton/>
        </View>
    )
};

export default TestSelection;