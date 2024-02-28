import { Text,StyleSheet,FlatList,View } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import {LIST1} from "../Data/dummy2";
import PatientHistoryGrid from "../Components/PatientHistoryGrid";


function PatientsHistoryScreen(){
    function renderCategoryItem(itemData){
        function presshandler(){
           

        }
    
        return(
        <View>
           
         
            <PatientHistoryGrid id={itemData.item.id} title={itemData.item.title} date={itemData.item.date} doctor={itemData.item.doctor} description={itemData.item.description} symptom={itemData.item.symptom} presId={itemData.item.presId}   onPress={presshandler}/>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <CustomHeader  title="Patient History" />
            <FlatList
                data={LIST1}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                style={{ flex: 1 }}
            />
        </View>
    );

}
export default PatientsHistoryScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E3F7FF'
    }
})