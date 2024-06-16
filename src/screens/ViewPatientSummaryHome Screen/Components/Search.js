import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

function Search({ patients, onSearch }) {
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState(patients);

  useEffect(() => {
    setFilteredData(patients);
  }, [patients]);

  const SearchFilter = (text) => {
    if (text) {
      const textParts = text.toUpperCase().split(" ");
      const newData = patients.filter((item) => {
        const itemData = `${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`;
        console.log("itemData", itemData);

        return textParts.every((part) => itemData.includes(part));
      });
      setFilteredData(newData);
      onSearch(newData);
      setInput(text);
    } else {
      setFilteredData(patients);
      onSearch(patients);
      setInput(text);
    }
  };

  return (
    <View style={styles.contain}>
      <TextInput
        value={input}
        style={{ fontSize: 15, marginLeft: 10 }}
        placeholder="Search"
        onChangeText={(text) => SearchFilter(text)}
      />
    </View>
  );
}

export default Search;
const styles = StyleSheet.create({
  contain: {
    padding: 8,
    flexDirection: "row",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    height: 37,
  },
});
