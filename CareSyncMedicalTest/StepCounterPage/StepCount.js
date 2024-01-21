import { View, StyleSheet ,Text} from "react-native";

const StepCount = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.texts}>Steps : </Text>
        <Text style={styles.texts}>00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:"center",
        display:"flex",
        flexDirection:"row",
    },
    texts:{
        fontSize:26,
    }
});

export default StepCount;
