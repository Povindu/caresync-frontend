import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import DocCardComp from "./comp/DocCardComp";
import Header from "../../components/Header";

import { useEffect, useState } from "react";
import axios from 'axios';

const baseUrl = 'http://10.0.2.2:4000/api';


function SelectDocForAccess({ navigation }) {

  const [DocList,setDocList] = useState([])
  const fetchDoctors = async () => {
    try{
      const configurationObject = {
        method: 'get',
        url: `${baseUrl}/doctors`,
      };
      console.log(configurationObject.url)
      const response = await axios(configurationObject);
      // console.log(response.data);
      setDocList(response.data)
    }
    catch(error){
      console.log("error " + error)
    }
    
  }

  
}

  useEffect(() => {
    fetchDoctors()}, [])

  const renderItem = ({ item }) => (
    <DocCardComp navigation={navigation} name={item.name} DocID={item.doctorID} id={item._id}  />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header name={"Select Doctor"} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {DocList && (
            <FlatList
              data={DocList}
              keyExtractor={(item) => item.doctorID}
              renderItem={renderItem}
            ></FlatList>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SelectDocForAccess;

const styles = StyleSheet.create({
  container:{
    paddingTop:15
  }
});
