import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LIST } from '../Data/dummy-data';
import SearchFilter from './SearchFilter';

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
    const [input,setInput]=useState("");

    const SearchFilter=(text)=>{
      if(text){
        const newData=LIST.filter((item)=>{
          const itemData=item.title? item.title.toUpperCase():''.toUpperCase();
          const textData=text.toUpperCase();
          return itemData.index0f(textData)>-1;
                });
                setfiterData(newData);
                setInput(text);

      }else{
        setfiterData(LIST);
        setInput(text);


      }
    }

  return (
    <View style={styles.contain}>
         
         <FlatList data={LIST}
        keyExtractor={(item)=>item.id}>
   

        </FlatList>
    
      <TextInput value={input}  style={{ fontSize: 15 ,marginLeft: 10,}} placeholder="Search" onChangeText={(text)=>SearchFilter(text)}/>
      {/* <SearchFilter data={LIST} input={input} setInput={setInput} ></SearchFilter> */}
      <View> 
        <TouchableOpacity>
            <AntDesign name='search1' size={20} marginLeft={250} ></AntDesign>
        </TouchableOpacity>
      </View>

    </View>
  
  );
}

export default Search;

