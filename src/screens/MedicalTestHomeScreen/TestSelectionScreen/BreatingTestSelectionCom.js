import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";

const BreatingTestSelection = ({ navigation }) => {

  //function to navigate breathing test home screen
  const handlePress = () => {
    navigation.navigate("BreathingHome");
  };

  return (
    //breathing test selection button to navigate 
    <View style={styles.view}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
        <View style={styles.imageview}>
          <Image source={require("../images/res.png")} style={styles.image} />
        </View>
        <Text style={styles.text}>Breathing Test</Text>
      </TouchableOpacity>
    </View>
  );
};

//stylesheet for breathing test selection button
const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  imageview: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
  buttonContainer: {
    width: 200,
    marginTop: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A7F4FF",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    marginLeft: 5,
    marginTop: 6,
    marginBottom: 10,
    width: 138,
    height: 138,
    marginRight: 10,
    borderRadius: 100,
    opacity: 0.8,
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BreatingTestSelection;
