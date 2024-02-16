import {Pressable,View,Text,StyleSheet,Image} from 'react-native';
import CustomHeader from './CustomHeader';
import axios from 'axios';
import { useState,useEffect} from 'react';
function PatientGridTile({id,title,imageUrl,gender,age,color,blood,onPress}){
    const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://10.10.4.158:3006/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
    
   
   
    return(
       
        <View style={[styles.gridItem ,{backgroundColor:color}]}>
           
            <Pressable android_ripple={{color:'#ccc'}} style={styles.button} onPress={onPress}>
           
          
       
                <View style={styles.innerContainer}>
                      <View><Image source={{uri: imageUrl}} style={styles.image}/></View>
                    
            
                    <Text style={styles.title}>
                        {title}
                    </Text>
                  
            

                    <View>
                    <Text style={styles.gender}>
                        {gender}
                    </Text> 
                         <Text style={styles.age}>
                        {age}
                    </Text>
                     
                  
                    </View>
                    <Text style={styles.id}>
                        {id}
                    </Text>
                  
                </View>
            </Pressable>
        </View>

    );
}
export default PatientGridTile;
const styles= StyleSheet.create({
    gridItem:{
        flex:1,
        marginBottom:8,
        marginTop:5,
        marginLeft:12,
        marginRight:12,
        height:90,
        borderRadius:10,
        elevation:4,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOpacity:0.25,
        textShadowOffset:{width:0, height:2},
        textShadowRadius:8,


    },
    button:{
        flex:1,
    },
    innerContainer:{
        flex:1,
        padding:16,
     

    },
    title:{
        paddingLeft:80,
        fontWeight:'bold',
        fontSize:18,
        marginTop: -52,
    },

    content:{
        flexDirection:'row'
    },
    gender:{
        marginTop:8,
        paddingLeft:80,
        fontSize:15,

    },
    age:{
        marginTop:-20,
        paddingLeft:180,
        fontSize:15,

    },
    image:{
        marginTop:2,
        width:50,
        height:50,

    },
    id:{
        paddingLeft:300,
        fontSize:15,
        marginTop:-20,

    }
    }
)