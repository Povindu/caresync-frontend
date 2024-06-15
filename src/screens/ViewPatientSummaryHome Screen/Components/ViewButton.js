import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const ViewButton = ({ onPress, iconName, iconSize, iconColor, text }) => (
  <View style={styles.contain}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.com}>
        <Text style={styles.textView}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);
export default ViewButton;
const styles = StyleSheet.create({
  contain: {
    marginLeft: 70,
  },
  com: {
    width: "150%",
    paddingTop: "4%",
    paddingBottom: "4%",
    color: "white",

    backgroundColor: "green",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: -5,
  },

  textView: {
    textAlign: "center",
    color: "white",
  },
});
