import { View } from "react-native";
import Header from "../../../../components/Header";
import StepCountButton from "./StepCountButtonCom";
import StepCountDataStore from "./StepCountDataStore";

const StepCounterHome=()=>{
    return(
        <View>
            <Header name={"Step Counter"}/>
            <StepCountButton/>
            <StepCountDataStore/>
        </View>

    );
};

export default StepCounterHome;