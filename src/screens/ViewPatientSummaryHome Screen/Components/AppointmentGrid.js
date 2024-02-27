import { Text,View ,StyleSheet,TouchableOpacity,Image,Animated} from "react-native";
import { Button } from "react-native-paper";
import ToochableIconDown from "../Components/TouchableIconDown";
import React, { useState,useRef } from 'react';
import SentenceBreaker from "../Components/SentenceBreaker";
function AppointmentGrid({id,title,date,description,doctor}){
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(100)).current;
    const handlePress = () => {
        const newHeight = expanded ? 100 : 230; // Target height
        Animated.timing(heightAnim, {
          toValue: newHeight,
          duration: 300, // Duration of the animation
          useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
       
        
      };
    
    
    return(
        
        
        <Animated.View style={[styles.tile ,expanded && styles.expandedContainer, { height: heightAnim }]}>
           
         
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <View  style={styles.icon}>
                   <ToochableIconDown onPress={handlePress} iconName={expanded ? 'up' : 'down'}  iconSize={30} iconColor="grey" />
                   </View>
                    <View>  
                        <Text style={styles.date}>
                        {date}
                         </Text> 
                    </View>
                  
               
               <View>
                    <Text style={styles.id}>
                       Appointment ID : {id}
                    </Text>
                       

               </View>
               
               {expanded && (
                <View>
                    <View style={styles.subtile1}>
                        <View style={styles.subcom1}>
                        <View style={styles.innertile1}>
                            <Text style={styles.innertext1}> Description :</Text>
                        </View>
                         <Text style={styles.subtext1}>
                         <SentenceBreaker sentence={description}  />
               
                        </Text>
                        </View>
                    </View>
                    <View style={styles.subtile2}>
                    <View style={styles.subcom1}>
                        <View style={styles.innertile2}>
                            <Text style={styles.innertext2}> Doctor :</Text>
                        </View>
                         <Text style={styles.subtext2}>
                                 {doctor}
                        </Text>
                    </View>
                    </View>
                
                </View> 
                          
                          )}

                     
               
               </Animated.View>
    );
}
export default AppointmentGrid;

const styles= StyleSheet.create({
    container:{
        flex:1,
    
    
 

    },
    tile:{
        flex:1,
        width:'90%',
        marginBottom:'2%',
        marginTop:'2%',
        marginLeft:'5%',
        marginRight: '5%',
        height:100,
        borderRadius:20,
        elevation:2,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOpacity:0.25,
    
 
        textShadowRadius:8,

    },
    button:{
        flex:1,
    },
  
    title:{
     
        fontWeight:'bold',
        fontSize:18,
        marginTop: 20,
        marginLeft: 25,

    },
    date:{
        paddingLeft:25,
        fontSize:15,
        marginTop:10,

    },


  
    id:{
        paddingLeft:200,
        fontSize:15,
        marginTop:-22,

    },
    icon:{
        paddingLeft: 320,
        marginTop: -30,
    },
    expandedContainer: {
        height: 220, // Increase the height when expanded
      },

    subtile1:{
   
        width:'90%',
        marginBottom:'2%',
        marginTop:'5%',
        marginLeft:'5%',
        marginRight: '5%',
        height:70,
        borderRadius:10,
        elevation:2,
        backgroundColor:'#FEFFE0',
        shadowColor:'black',
        shadowOpacity:0.25,
    
 
        textShadowRadius:8,


        },
        subtile2:{
            
        width:'90%',
        marginBottom:'2%',
        marginTop:'1%',
        marginLeft:'5%',
        marginRight: '5%',
        height:40,
        borderRadius:10,
        elevation:2,
        backgroundColor:'#E3FFFC',
        shadowColor:'black',
        shadowOpacity:0.25,
        textShadowRadius:8,

        },
        innertile1:{
        width:'35%',
        marginBottom:'2%',
        marginTop:'2%',
        marginLeft:'3%',
        marginRight: '3%',
        height:22,
        borderRadius:10,
        elevation:2,
        backgroundColor:'#FFEBA5',
        shadowColor:'black',
        shadowOpacity:0.25,
        textShadowRadius:8,
        

        },
        innertile2:{
            width:'35%',
            marginBottom:'2%',
            marginTop:'2%',
            marginLeft:'3%',
            marginRight: '3%',
            height:22,
            borderRadius:10,
            elevation:2,
            backgroundColor:'#A7F4FF',
            shadowColor:'black',
            shadowOpacity:0.25,
            textShadowRadius:8,
    
            },
            innertext1:{
                paddingLeft:15,
                fontSize:13,
                marginTop:2,
                fontWeight:'bold',
            },
            innertext2:{
              
                fontSize:13,
                marginTop:2,
                fontWeight:'bold',
                textAlign:'center',
            },
            subtext1:{
                paddingLeft:10,
                marginRight: '3%',
                fontSize:13,
                marginTop: '2%',
                
               
            },
            subcom1:{
                flexDirection:'row'
            },
            subtext2:{
                paddingLeft:10,
                marginRight: '3%',
                fontSize:13,
                marginTop:'3%',
                      

            }
   
})