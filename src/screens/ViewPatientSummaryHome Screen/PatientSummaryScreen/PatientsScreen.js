import {FlatList,View,ScrollView} from 'react-native';
import { LIST} from '../Data/dummy-data';
import PatientGridTile from '../Components/PatientGridTile';
import Search from '../Components/Search';
import CustomHeader from '../Components/CustomHeader';



function PatientsScreen({navigation}){
   
   
    function renderCategoryItem(itemData){
        function presshandler(){
            navigation.navigate('PatientProfileScreen',{patientId:itemData.item.id,});

        }
    
        return(
        <View>
           
         
            <PatientGridTile id={itemData.item.id} title={itemData.item.title} color={itemData.item.color} age={itemData.item.age} gender={itemData.item.gender} imageUrl={itemData.item.imageUrl} onPress={presshandler}/>
            </View>
        );
    }
    return(
        <View style={{ flex: 1 }}>
            <CustomHeader  title="My Patients" />
            <FlatList
                data={LIST}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                style={{ flex: 1 }}
            />
        </View>
    );

}
export default PatientsScreen;