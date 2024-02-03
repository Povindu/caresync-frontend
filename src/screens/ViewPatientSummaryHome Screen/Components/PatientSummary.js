import {Pressable,View,Text,StyleSheet,Image} from 'react-native';
function PatientSummary({id,title,imageUrl,gender,age,weight,height,blood}){
    return(

           
          <View>
       
                <View style={styles.first}>
                      <View><Image source={{uri: imageUrl}} style={styles.image}/></View>
                    
                         <View style={styles.tid}>
                                <Text style={styles.title}>
                                    {title}
                                 </Text>
                                <Text style={styles.id}>
                                     {id}
                                </Text>
                        </View>
                  
           

                    <View style={styles.main1}>
                        <View style={styles.cat1}>
                            <Text style={styles.text1}> Gender</Text>
                            <Text style={styles.gender}>
                            {gender}
                             </Text> 
                            
                        </View>
                        <View style={styles.cat2}>
                            <Text style={styles.text2}> Age</Text>
                             <Text style={styles.age}>
                                {age}
                                </Text>
                            
                        </View>
                        <View style={styles.cat3}>
                        <Text style={styles.text3}> Weight</Text>
                             <Text style={styles.weight}>
                                {weight}
                                </Text>
                        
                            
                            </View>

                     
                            

                      
                     
                     
                  
                    </View>
                    
                    <View style={styles.main2}>
                        <View style={styles.cat4}>
                           
                            <Text style={styles.text4}> Blood Group</Text>
                            
                      
                    
                            <Text style={styles.blood}>
                                        {blood}
                            </Text>
                    
                        </View>
                        <View style={styles.cat5}>
                            <Text style={styles.text5}> Height</Text>
                             <Text style={styles.height}>
                                {height}
                                </Text>
                            
                        </View>
                       


                     
                            

                      
                     
                     
                  
                    </View>




                </View>
                
            
                
               
                </View>

    );


}
export default PatientSummary;
const styles= StyleSheet.create({

    innerContainer:{
        flex:1,
        padding:16,
     

    },
    title:{

        fontWeight:'bold',
        fontSize:18,
        marginTop: 15,
      
       
    },
    first:{
        justifyContent:'center',
        alignItems:'center'

    },
    tid:{
     
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
          
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
    
        width: 50,
        height: 50,
      },

    content:{
        flexDirection:'row'
    },
    gender:{

       
        fontSize:20,
        marginLeft: 35,
        color:'#00567D',
       fontWeight:'bold'

    },
    age:{
        
        fontSize:20,
        marginLeft: 50, color:'#00567D',
        fontWeight:'bold'

    },
    
      
    id:{
       
        fontSize:15,
        marginTop:10,
     
    },
    blood:{
        
        fontSize:20,
        marginLeft: 70,
        color:'#00567D',
        fontWeight:'bold'

    },
    cat1:{
        flexDirection:'column',
    

    },
    text1:{
        fontSize:15,
        marginLeft: 30
    },
    cat2:{
        flexDirection:'column',
      

    },
    main1:{
        flexDirection:'row',
        marginTop:20,

    }
    ,cat3:{
        flexDirection:'column',
        marginLeft: 50

    },
    weight:{
        
        fontSize:20,
        color:'#00567D',
        fontWeight:'bold'

    },
   text2:{
    fontSize:15,
    marginLeft: 80
    


   },text3:{
    fontSize:15,

   },

    main2:{
        flexDirection:'row',
        marginTop:20,
    },
    cat4:{
        flexDirection:'column',
        marginLeft: 30
    
    
    
    
    },
    cat5:{
        flexDirection:'column',
    
    },
    height:{

       
        fontSize:20,
        marginLeft: 50
        , color:'#00567D',
        fontWeight:'bold'

    },
    text4:{
        fontSize:15,
        marginLeft:40
    
       },
       
    text5:{
        fontSize:15,
        marginLeft:60
    
       },
      
    }
)