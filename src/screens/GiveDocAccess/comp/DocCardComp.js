import { View, StyleSheet ,Text, Pressable, SafeAreaView} from "react-native";



function DocCard({navigation,name,id}){
    
  function onPressHandler(){
    navigation.navigate('GiveDocAccessScreen', {name,id})
  }
  
  return (

    <SafeAreaView >
        <View style={styles.background}>
          <View style={styles.card}>
            <Pressable onPress={onPressHandler}>
                <Text>Doctor Name: {name}</Text>
                <Text>Doc ID: {id}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    
  );
}
export default DocCard;

const styles = StyleSheet.create({

  background:{
    // backgroundColor:'#00567D'
  }

    }
  );
  
  