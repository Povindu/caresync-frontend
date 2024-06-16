import React from "react";
import { View, Text } from "react-native";
import Search from "./Search";
function CustomHeader({ patients, onSearch }) {
  return (
    <View
      style={{
        backgroundColor: "#00567D",
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        My Patients
      </Text>
      <Search patients={patients} onSearch={onSearch} />
    </View>
  );
}
export default CustomHeader;
