import PatientSummary from "../Components/PatientSummary";
import {FlatList,View,StyleSheet, Button, TouchableOpacity,Text,Image} from 'react-native';
import { LIST} from '../Data/dummy-data';
import ProfileHeader from "../Components/ProfileHeader";
function PatientProfileScreen({route,navigation}){
    const pId=route.params.patientId;
    const dispalyedpatient=LIST.filter((patient) =>{
        return patient.id.indexOf(pId)>=0;
    });
    
    function renderCategoryItem(itemData){
        
    
   
        return(
            <View>
            <View >
           <View style={styles.subcon}>
               
               </View>
               
               
          <View style={styles.grid}>

             
            <PatientSummary id={itemData.item.id} title={itemData.item.title} age={itemData.item.age} gender={itemData.item.gender} imageUrl={itemData.item.imageUrl} weight={itemData.item.weight} height={itemData.item.height} blood={itemData.item.blood}  />
            </View>
           



                

            </View>
         
            <View style={styles.row1}>
                  
                        <View style={styles.tile1} >
                            <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20,}} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                            <Image style={styles.img} source={require('../assets/images/medication.png')} />
                                <Text style={styles.text} >Patient History</Text>
                            </TouchableOpacity>

                        </View>
                    

                <View style={styles.tile1}>
                            <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20,}} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                            <Image style={styles.img} source={require('../assets/images/medication.png')} />
                                <Text style={styles.text} >Medications</Text>
                            </TouchableOpacity>

               

                </View>
            </View>
            <View style={styles.row1}>
                <View style={styles.tile1}>
                            <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20,}} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                            <Image style={styles.img} source={require('../assets/images/appointement.png')} />
                                <Text style={styles.text} >Past Appointments </Text>
                            </TouchableOpacity>

                </View>
                <View style={styles.tile1}>
                            <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20,}} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                            <Image style={styles.img} source={require('../assets/images/results.png')} />
                                <Text style={styles.text} >Test Results</Text>
                            </TouchableOpacity>

                </View>
               
            </View>
            <View style={styles.row1}>
                <View style={styles.tile1}>
                            <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20, }} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                            <Image style={styles.img} source={require('../assets/images/appointement.png')} />
                                <Text style={styles.text} >Contact Patient</Text>
                            </TouchableOpacity>

                </View>
                <View style={styles.tile1}>
                             {/* <TouchableOpacity style={{backgroundColor:'white',height:120,width:160,borderRadius:15,marginLeft: 20,marginTop: 20,}} onPress={()=>navigation.navigate("PatientHistoryScreen")}>
                                <Text style={styles.text} >Patient History</Text>
                            </TouchableOpacity> */}

                </View>
               
            </View>

            </View>
        
        );
    }
    return(
        <View style={styles.con}>
             

       
             
          
        <FlatList data={dispalyedpatient}
        keyExtractor={(item)=>item.id}
        renderItem={renderCategoryItem}>

        </FlatList>
        
        </View>
    );
}
export default PatientProfileScreen;
const styles = StyleSheet.create({
    con:{
        flex:1,
       backgroundColor:'#D0F1FF'
    }, 
    subcon:{
        width:'100%',
        height:300,
        backgroundColor:'#00567D',
        marginTop: -50,
      
    },grid:{
        width:'90%',
        height:300,
        marginLeft:20,
        backgroundColor:'white',
        marginTop: -160,
        borderRadius:15
      
    },
    // tile1:{
    //     width:'40%',
    //     height:120,
    //     marginLeft:20,
    //     backgroundColor:'white',
    //     marginTop: 20,
    //     borderRadius:15
    //    },
       row1:{
        flexDirection:'row',
        marginLeft: 15
     
       },

       text:{
        color:'black',
        fontSize:15,
        textAlign:'center',
        marginTop:8,

        
       },

       img:{
        width:70,
        height:70,
        marginLeft:40,
        marginTop:10

       }
    
 

});