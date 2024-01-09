import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
  contain: {
    padding: 8,
    flexDirection: 'row',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    height:37
  },
});

function Search() {
  return (
    <View style={styles.contain}>
    
      <TextInput style={{ fontSize: 15 ,marginLeft: 10,}} placeholder="Search" />
      <View> 
        <TouchableOpacity>
            <AntDesign name='search1' size={20} marginLeft={250} ></AntDesign>
        </TouchableOpacity>
      </View>

    </View>
  
  );
}

export default Search;

