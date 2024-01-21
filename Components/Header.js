import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
const Header = ({ text }) => {
 
    return(
      <SafeAreaView>
     
        <View style={styles.headercontainer}>
        <Text style={styles.text}>{text}</Text>
        <StatusBar style="auto" />
      </View>
      </SafeAreaView>
    )

}
export default Header;
const styles = StyleSheet.create({

    headercontainer: {
  
      backgroundColor: '#00567D',
      alignItems: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      height: 115,
      width: '100%',
  
    },
    text: {
        paddingTop: 50,
        fontSize: 20,
        color: '#FFF',
        // fontFamily: 'poppins medium',
      },
});