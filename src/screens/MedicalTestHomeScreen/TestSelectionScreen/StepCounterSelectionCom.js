import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";

const StepCounterSelection = ({navigation}) => {
  return (
    //stepcounter selection button which navigate to step counter home screen
    <View style={styles.view}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('StepCounterHome')}>
        <Image source={require("../images/foot.png")} style={styles.image} />
        <Text style={styles.text}>Step Counter</Text>
      </TouchableOpacity>
    </View>
  );
};

//stylesheet for stepcounter selection button
const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  buttonContainer: {
    width: 200,
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEBA5",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    marginLeft: 10,
    marginBottom: 10,
    width: 160,
    height: 160,
    marginRight: 10,
    borderRadius:100,
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StepCounterSelection;
