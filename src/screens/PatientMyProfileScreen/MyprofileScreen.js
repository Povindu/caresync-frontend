import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { baseUrl } from "../../constants/constants";

import Header from "../../components/Header";
import DetailRow from "./components/DetailRow";
import api from "../../Services/AuthService";
import { useAuthContext } from "../../hooks/useAuthContext";
import ImagePicker from "./components/ImagePicker";

const MyprofileScreen = ({ navigation }) => {
  const { user } = useAuthContext();

  const [details, setDetails] = useState([]);
  const [id, setId] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("User in MyProfileScreen:", user);
    setId(user._id);
    getDetails();
  }, []);

  const getDetails = () => {
    api
      .get(`${baseUrl}/patients/${user._id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  const handleChangePassword = () => {
    setLoading(true);

    //if current password not empty
    if (!currentPassword) {
      setPasswordChangeStatus("Please enter your current password");
      setLoading(false);
      return;
    }

    //if new password not empty
    if (!newPassword) {
      setPasswordChangeStatus("Please enter your new password");
      setLoading(false);
      return;
    }

    //if confirm new password not empty
    if (!confirmNewPassword) {
      setPasswordChangeStatus("Please confirm your new password");
      setLoading(false);
      return;
    }

    //if new password and confirm new password are not same
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeStatus("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    api
      .post(baseUrl + "/changePassword", {
        currentPassword,
        newPassword,
        userType: "patient",
        id: user._id,
      })
      .then((response) => {
        console.log("Response from change password:", response);
        if (response.status === 200) {
          setPasswordChangeStatus("Password changed successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          setPasswordChangeStatus("Error changing password");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error changing password:", error.response.data.error);
        setPasswordChangeStatus(error.response.data.error);
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    // Navigate to ForgotPassword screen
    navigation.navigate("ForgotPassword", { userType: "patient" });
  };

  const refreshUserData = () => {
    getDetails(); // Fetch updated user data
  };

  return (
    <View style={styles.maincontainer}>
      <Header name="My Profile" />
      <ScrollView>
        <View style={styles.container}>
          <ImagePicker picture={details.profileImage} />
          <Text style={styles.yourinfo}>Your Info</Text>
          <React.Fragment>
            <DetailRow
              name="user-alt"
              textLineOne="Full Name"
              textLineTwo={`${details.firstName} ${details.lastName}`}
              category="fullName"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="envelope"
              textLineOne="Email Address"
              textLineTwo={details.email}
              category="email"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="id-card"
              textLineOne="NIC Number"
              textLineTwo={details.nic}
              category="nic"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="home"
              textLineOne="Address"
              textLineTwo={details.address}
              category="address"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="mobile"
              textLineOne="Mobile Number"
              textLineTwo={details.mobileNumber}
              category="mobile"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="birthday-cake"
              textLineOne="Birthday"
              textLineTwo={details.birthday}
              category="birthday"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="venus-mars"
              textLineOne="Gender"
              textLineTwo={details.gender}
              category="gender"
              refreshUserData={refreshUserData}
            />
          </React.Fragment>
        </View>

        <View style={styles.container}>
          <Text style={styles.yourinfo}>Health Info</Text>
          <React.Fragment>
            <DetailRow
              name="weight-hanging"
              textLineOne="Weight"
              textLineTwo={`${details.weight} kg`}
              category="weight"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="arrows-alt-v"
              textLineOne="Height"
              textLineTwo={`${details.height} cm`}
              category="height"
              refreshUserData={refreshUserData}
            />
            <DetailRow
              name="tint"
              textLineOne="Blood Group"
              textLineTwo={details.blood}
              category="blood"
              refreshUserData={refreshUserData}
            />
          </React.Fragment>
        </View>

        {/* Change Password Section */}
        <View style={styles.container}>
          <Text style={styles.yourinfo}>Change Password</Text>
          <View style={styles.passwordChangeContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              onChangeText={setCurrentPassword}
              value={currentPassword}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              onChangeText={setNewPassword}
              value={newPassword}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              onChangeText={setConfirmNewPassword}
              value={confirmNewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handleChangePassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.changePasswordButtonText}>
                  Change Password
                </Text>
              )}
            </TouchableOpacity>
            {passwordChangeStatus && (
              <Text style={styles.passwordChangeStatus}>
                {passwordChangeStatus}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
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

  yourinfo: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  passwordChangeContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  changePasswordButton: {
    backgroundColor: "#30A8DE",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  changePasswordButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  passwordChangeStatus: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  forgotPassword: {
    textAlign: "center",
    color: "#30A8DE",
    textDecorationLine: "underline",
    marginTop: 10,
    marginBottom: 20,
  },
});
