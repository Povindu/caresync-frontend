import { Text,StyleSheet,FlatList,View } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import {LIST1} from "../Data/dummy2";
import AppointmentGrid from "../Components/AppointmentGrid";


function PastAppointmentScreen(){
    function renderCategoryItem(itemData){
        function presshandler(){
           

        }
    
        return(
        <View>
           
         
            <AppointmentGrid id={itemData.item.id} title={itemData.item.title} date={itemData.item.date} doctor={itemData.item.doctor} description={itemData.item.description}  onPress={presshandler}/>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <CustomHeader  title="Past Appointments" />
            <FlatList
                data={LIST1}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                style={{ flex: 1 }}
            />
        </View>
    );

}
export default PastAppointmentScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E3F7FF'
    }
})