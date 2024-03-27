import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";

// Importing Components
import DocCardComp from "./Components/DocCardComp";
import Header from "../../components/Header";

import { baseUrl } from "../../constants/constants";

function SelectDocForAccess({ navigation }) {
  const [DocList, setDocList] = useState([]);

  // Fetching Doctors from the backend
  const fetchDoctors = async () => {
    try {
      const configurationObject = {
        method: "get",
        url: `${baseUrl}/doctors`,
      };
      console.log(configurationObject.url);
      const response = await axios(configurationObject);
      // console.log(response.data);
      setDocList(response.data);
    } catch (error) {
      console.log("error " + error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Rendering the Doctor List Component
  const renderItem = ({ item }) => (
    <DocCardComp
      navigation={navigation}
      name={item.firstName + " " + item.lastName}
      DocID={item.medicalId}
      id={item._id}
    />
  );

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Header name={"Select Doctor"} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {DocList && (
            <FlatList
              data={DocList}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
            ></FlatList>
          )}
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
});

export default SelectDocForAccess;
