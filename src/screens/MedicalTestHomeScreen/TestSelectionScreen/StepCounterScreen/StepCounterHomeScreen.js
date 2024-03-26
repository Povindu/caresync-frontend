import { View } from "react-native";
import Header from "../../components/Header";
import StepCountButton from "./StepCountButtonCom";

const StepCounterHome=()=>{
    return(
        //components in step counter home screen
        <View>
            <Header name={"Step Counter"}/>
            <StepCountButton/>
        </View>

    );
};

export default StepCounterHome;