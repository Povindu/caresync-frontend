import { Text, StyleSheet, FlatList, View, ScrollView } from "react-native";
import Header2 from "../Components/Header2";
import ContactPatientData from "../Components/ContactPatientData";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/constants";
import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../Services/AuthService";

function ContactPatientScreen({ route }) {
  const { user } = useAuthContext();
  const [details, setDetails] = useState([]);
  const [id, setId] = useState();
  const pId = route.params.pId; // Get pId from route parameters

  useEffect(() => {
    setId(user._id);
    getDetails();
  }, []);

  const getDetails = () => {
    console.log("User in ContactPatientScreen:", pId);
    api
      .get(`${baseUrl}/patients/${pId}`)
      .then((response) => {
        setDetails(response.data);
        console.log("Response from backend:", response.data);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };
  const refreshUserData = () => {
    getDetails(); // Fetch updated user data
  };

  return (
    <View style={styles.maincontainer}>
      <Header2 text="Contact Patient" />

      <View style={styles.container}>
        <Text style={styles.contactinfo}>Contacts</Text>

        <React.Fragment>
          <ContactPatientData
            name="user-alt"
            textLineOne="Full Name"
            textLineTwo={`${details.firstName} ${details.lastName}`}
            category="fullName"
            backgroundColor="#FEFFE0"
            refreshUserData={refreshUserData}
          />
          <ContactPatientData
            name="envelope"
            textLineOne="Email Address"
            textLineTwo={details.email}
            category="email"
            backgroundColor="#FEFFE0"
            color="#00567D"
          />
          <ContactPatientData
            name="mobile"
            textLineOne="Mobile Number"
            textLineTwo={details.mobileNumber}
            category="mobile"
            backgroundColor="#FEFFE0"
            color="#00567D"
          />
          <ContactPatientData
            name="home"
            textLineOne="Address"
            textLineTwo={details.address}
            category="birthday"
            backgroundColor="#FEFFE0"
          />
        </React.Fragment>
      </View>
    </View>
  );
}
export default ContactPatientScreen;
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#E3F7FF",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  contactinfo: {
    fontSize: 20,
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
