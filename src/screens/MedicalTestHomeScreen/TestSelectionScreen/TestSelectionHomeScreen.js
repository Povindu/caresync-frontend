import { View } from "react-native";
import Header from "../components/Header";
import StepCounterSelection from "./StepCounterSelectionCom";
import BreatingTestSelection from "./BreatingTestSelectionCom";


const TestSelection =({navigation})=>{
    return(
        <View>
        <Header name="Medical Test"/>
        <StepCounterSelection navigation={navigation}/>
        <BreatingTestSelection navigation={navigation}/>
        </View>
    )
};

export default TestSelection;