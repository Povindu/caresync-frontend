import * as React from "react";
import { Appbar } from "react-native-paper";

const TestHeader = ({ name }) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: "#00567D",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} color="white" size={28} />
      <Appbar.Content
        title={name}
        titleStyle={{ fontWeight: "bold", fontSize: 24, marginLeft:90}}
        color="white"
      />
    </Appbar.Header>
  );
};
export default TestHeader;
