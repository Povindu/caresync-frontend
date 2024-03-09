import { View } from "react-native";
import Header from "../../components/Header";
import StepCountButton from "./StepCountButtonCom";

const StepCounterHome=()=>{
    return(
        <View>
            <Header name={"Step Counter"}/>
            <StepCountButton/>
        </View>

    );
};

export default StepCounterHome;