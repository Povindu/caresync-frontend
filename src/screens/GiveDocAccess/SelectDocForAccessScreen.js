import { View, StyleSheet ,Text, Pressable, ScrollView, FlatList, SafeAreaView} from "react-native";
import DocCardComp from './comp/DocCardComp'
import Header from "../../components/Header";

function SelectDocForAccess({navigation}){

  const menuItemsToDisplay = [
    { name: 'Hummus', id: '1A' },
    { name: 'Moutabal', id: '2B' },
    { name: 'Falafel', id: '3C' },
    { name: 'Marinated Olives', id: '4D' },
    { name: 'Kofta', id: '5E' },
    { name: 'Eggplant Salad', id: '6F' },
    { name: 'Lentil Burger', id: '7G' },
    { name: 'Smoked Salmon', id: '8H' },
    { name: 'Kofta Burger', id: '9I' },
    { name: 'Turkish Kebab', id: '10J' },
    { name: 'Fries', id: '11K' },	
    { name: 'Buttered Rice', id: '12L' },
    { name: 'Bread Sticks', id: '13M' },
    { name: 'Pita Pocket', id: '14N' },
    { name: 'Lentil Soup', id: '15O' },
    { name: 'Greek Salad', id: '16Q' },
    { name: 'Rice Pilaf', id: '17R' },
    { name: 'Baklava', id: '18S' },
    { name: 'Tartufo', id: '19T' },
    { name: 'Tartufo', id: '20U' },
    { name: 'Tiramisu', id: '21V' },
    { name: 'Panna Cotta', id: '22W' },
    ];
    
  // function OnPressHandler(){
  //   navigation.navigate('MedicalIncidentDetailScreen')
  // }

  const renderItem = ({ item }) => <DocCardComp navigation={navigation} name={item.name} id={item.id} />;
  
  return (

    <SafeAreaView style={{flex:1}}>
      <Header name={"Select Doctor"}/>
        <View style={{flex:0.8}}>
          <ScrollView>
            <FlatList data={menuItemsToDisplay} keyExtractor={item => item.id} renderItem={renderItem}></FlatList>
          </ScrollView>
        </View>
      </SafeAreaView>
    
  );
}
export default SelectDocForAccess;

const styles = StyleSheet.create({
    // page:{
    //   flex: 1,
    //   justifyContent: 'center',
      
    // },

    
    // text2:{
    //   marginLeft: 80,
    //   marginTop:50,
    //   fontSize: 20,
    //   color:'#1e1e1e',
    // },
  
  
    // container: {
    //   flexDirection: 'column',
    //   width: '100%',
    //   height:'76%',
    //   backgroundColor: '#FFFF',
    //   // flex: 1,
    //   // justifyContent:'center',
      
  
    // },
  
    // background: {
    //   backgroundColor: '#DEFFFB',
    //   width: '100%',
    //   height: '100%',
    //   padding: 15,
      
      
    // },
  
    
    // input2:{
    //   borderColor: '#8e8e8e',
    //   borderWidth:1,
    //   padding:10,
    //   width:'88%',
    //   height:94,
    //   margin:20,
    //   marginTop:10,
    //  borderRadius:10,
    //   textAlignVertical: 'top',
    //   fontSize:16,
      
    // },
    // txtbtn:{
    //   color:'#FFF',
    //   padding:8,
    //   fontSize:16,
      
    // },
    // btn:{
    //   backgroundColor:'#00567D',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   borderRadius:10,
    //   maxWidth:'100%',
    //   padding:2,

    // }

   
    }
  );
  
  