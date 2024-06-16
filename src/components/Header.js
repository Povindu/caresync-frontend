import * as React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Header = ({ name }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header
      style={{
        backgroundColor: "#00567D",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Appbar.BackAction
        onPress={() => navigation.goBack()}
        color="white"
        size={28}
        style={{ width: 50, 
          height:60,}}
      />
      
      <Appbar.Content
        title={name}
        titleStyle={{
          fontWeight: "bold",
          fontSize: 24,
          textAlign: "center",
          marginLeft: -50,
        }}
        color="white"
      />
    </Appbar.Header>
  );
};
export default Header;
