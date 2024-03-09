import { Text } from "react-native-paper";

const { View, StyleSheet } = require("react-native");

const DisplayTime = ({time}) =>{
    
    const { s, m, h} = time;
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {h >=10 ? h : "0" +h}
            :
                {m >=10 ? m : "0" +m}
            :
                {s >=10 ? s : "0" +s}
            </Text>
            
        </View>
    );

}

const styles= StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        margin:10,
    },
    text:{
        fontSize:46,
    }
})

export default DisplayTime;