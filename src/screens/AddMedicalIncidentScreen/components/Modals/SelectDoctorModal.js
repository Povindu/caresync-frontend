import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { baseUrl } from "../../../../constants/constants";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import api from "../../../../Services/AuthService";
import DocCardComp from "../docCard";

const SelectDocModal = ({ onClose, setSelectedDocOut }) => {
  const navigation = useNavigation(); // Get navigation object
  const [docList, setDocList] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState();

  useEffect(() => {
    console.log("Selected Doctor:", selectedDoc);
    setSelectedDocOut(selectedDoc);
  }, []);

  console.log("Selected Doctor Out:", selectedDoc);

  const getDoctorList = () => {
    api
      .get(`${baseUrl}/doctors`, {})
      .then((response) => {
        console.log("Success:", response.data);
        setDocList(response.data);
      })
      .catch((error) => {
        Alert.alert("Error Retriving Doctors:", error.response.data.error);
        console.log("Error Retriving Doctors:", error);
      });
  };

  const selectDoc = () => {};

  const renderItem = ({ item }) => (
    <DocCardComp
      navigation={navigation}
      name={item.firstName + " " + item.lastName}
      DocID={item.medicalId}
      id={item._id}
      onClose={handleCloseModal}
      setSelected={setSelectedDoc}
    />
  );

  const handleCloseModal = () => {
    console.log("Doc", selectedDoc);
    console.log("Close Modal");
    onClose();
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Select Doctor</Text>

      <View style={styles.contentContainer}>
        {docList && (
          <FlatList
            data={docList}
            keyExtractor={(item) => item?._id}
            renderItem={renderItem}
          ></FlatList>
        )}
        {docList.length === 0 && <Text>No Doctors Found</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Close" onPress={onClose} color="#00567D" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={{ borderRadius: 50 }}
            title="OK"
            onPress={selectDoc}
            color="#00567D"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "55%",
    position: "absolute",
    height: "50%",
    left: 0,
    right: 0,
    bottom: 10,
    marginLeft: "3%",
    alignContent: "center",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    width: "94%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  modalText: {
    fontSize: 23,
    fontWeight: "900",
    top: 0,
    position: "absolute",
    padding: 10,
    color: "#013d59",
  },
  contentContainer: {
    width: "100%",
    height: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "92%",
    left: 30,
    top: 380,
  },
  buttonWrapper: {
    width: "40%", // Adjust as needed
    borderRadius: 10,
  },
  label: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "8%",
  },
  inputcontainer: {
    marginVertical: "-16%",
    marginTop: 2,
  },

  input: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 10,
    width: "88%",
    height: 38,
    marginBottom: 40,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  dropdowncontainer: {
    marginLeft: "4%",
    marginVertical: "-6%",
    marginTop: "1%",
  },
});

export default SelectDocModal;
