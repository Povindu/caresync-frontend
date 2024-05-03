import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";

import { baseUrl } from "../../constants/constants";
import axios from "axios";
import Header from "../../components/Header";
import DetailRow from "./components/DetailRow";
import { id } from "date-fns/locale";

const MyprofileScreen = () => {
  const [details, setDetails] = useState([]); //store breathing test results
  const _id = "662e930c4c0bf9f41d0da56a";

  //load when start
  useEffect(() => {
    getDetails();
  }, []);

  // integrate get result API
  const getDetails = () => {
    axios
      .get(`${baseUrl}/patients`) // Assuming your backend route is '/patients/:id'
      .then((response) => {
        setDetails(response.data); // Assuming response.data contains the patient details
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <View style={styles.maincontainer}>
      <Header name="My Profile" />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../../../assets/patient.png")}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.yourinfo}>Your Info</Text>

          <View>
            {details.map((data, index) => {
              // Check if the data's _id matches the _id you're interested in
              if (data._id === _id) {
                console.log("Data: ", data._id);
                return (
                  <React.Fragment key={index}>
                    <DetailRow
                      name="user-alt"
                      textLineOne="Full Name"
                      textLineTwo={`${data.firstName} ${data.lastName}`}
                      category="fullName"
                    />
                    <DetailRow
                      name="envelope"
                      textLineOne="Email Address"
                      textLineTwo={data.email}
                      category="email"
                    />
                    <DetailRow
                      name="mobile"
                      textLineOne="Mobile Number"
                      textLineTwo={data.mobileNumber}
                      category="mobile"
                    />
                    <DetailRow
                      name="birthday-cake"
                      textLineOne="Birthday"
                      textLineTwo={data.birthday}
                      category="birthday"
                    />
                    <DetailRow
                      name="venus-mars"
                      textLineOne="Gender"
                      textLineTwo={data.gender}
                      category="gender"
                    />
                  </React.Fragment>
                );
              }
              return null; // If _id doesn't match, return null
            })}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.yourinfo}>Health Info</Text>
          <View>
            {details.map((data, index) => {
              // Check if the data's _id matches the _id you're interested in
              if (data._id === _id) {
                console.log("Data: ", data._id);
                return (
                  <React.Fragment key={index}>
                    <DetailRow
                      name="weight-hanging"
                      textLineOne="Weight"
                      textLineTwo={`${data.weight} kg`}
                      category="weight"
                    />
                    <DetailRow
                      name="arrows-alt-v"
                      textLineOne="Height"
                      textLineTwo={`${data.height} cm`}
                      category="height"
                    />
                    <DetailRow
                      name="tint"
                      textLineOne="Blood Group"
                      textLineTwo={data.blood}
                      category="blood"
                    />
                  </React.Fragment>
                );
              }
              return null; // If _id doesn't match, return null
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MyprofileScreen;
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#D9F8FF",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
  },

  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  yourinfo: {
    fontSize: 16,
    marginLeft: 30,

    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
