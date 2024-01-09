import {Pressable,View,Text,StyleSheet,Image} from 'react-native';

function PatientGridTile({title,imageUrl,gender,age,color,onPress}){
   
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
        paddingLeft:100,
        fontWeight:'bold',
        fontSize:18,
        marginTop: -52,
    },

    content:{
        flexDirection:'row'
    },
    gender:{
        marginTop:8,
        paddingLeft:100,
        fontSize:15,

    },
    age:{
        marginTop:-22,
        paddingLeft:210,
        fontSize:15,

    },
    image:{
        marginTop:4,
        width:50,
        height:50,

    }
    }
)