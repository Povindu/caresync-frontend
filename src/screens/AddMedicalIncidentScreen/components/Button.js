import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Pressable,navigation,navigate,View,SafeAreaView } from 'react-native';

const Button = ({ navigation, text, screenName })=> {
 const onPressHandler = () => {
          navigation.navigate(screenName);
        };
    
    
    return(

        <View>
        <Pressable style={styles.btn}  onPress={onPressHandler}>
            <Text style={styles.btntext}>{text}</Text>
          </Pressable>
          </View>

    )
}
export default Button;

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#00567D',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        maxWidth:'100%',
        padding:2,
  
      },
     btntext:{
        color: '#FFF',
        padding:8,
        fontSize:16,
        
      },
});