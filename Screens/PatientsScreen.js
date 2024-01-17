import {FlatList,View} from 'react-native';
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
        <View>
         
          
        <FlatList data={LIST}
        keyExtractor={(item)=>item.id}
        renderItem={renderCategoryItem}>

        </FlatList>
        </View>
    );

}
export default PatientsScreen;