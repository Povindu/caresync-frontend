import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
function Header(){
    return(
        <View style={styles.headercontainer}>
        <Text style={styles.text}>Add Medical Incident</Text>
        <StatusBar style="auto" />
      </View>
    )

}
export default Header;
const styles = StyleSheet.create({

    headercontainer: {
  
      backgroundColor: '#00567D',
      alignItems: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      height: 95,
      width: '100%',
  
    },
    text: {
        paddingTop: 50,
        fontSize: 20,
        color: '#FFF',
        // fontFamily: 'poppins medium',
      },
});