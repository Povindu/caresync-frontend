import React from 'react';
import { TouchableOpacity, View, StyleSheet ,Text} from 'react-native';


const ViewButton = ({ onPress, iconName, iconSize, iconColor,text }) => (

  <TouchableOpacity  onPress={onPress} >
    <View style={styles.com}>
    <Text style={styles.textView}>{text}</Text>
    </View>

  </TouchableOpacity>
);
export default ViewButton;
const styles=StyleSheet.create({        
    com:{
        width:'100%',
        padding:'4%',
        color:'white',
        
        backgroundColor:'green',
        borderRadius:10,
   
      
      

    },

    textView:{
        textAlign:'center',
        color:'white'
       
    

    }
})