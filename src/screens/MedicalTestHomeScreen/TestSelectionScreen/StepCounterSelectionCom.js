import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";

const StepCounterSelection = ({navigation}) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('StepCounterHome')}>
        <Image source={require("../../../assets/foot.png")} style={styles.image} />
        <Text style={styles.text}>Step Counter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  buttonContainer: {
    width: 200,
    marginTop: 120,
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
