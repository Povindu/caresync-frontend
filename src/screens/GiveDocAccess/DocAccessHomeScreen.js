import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useAuthContext } from "../../hooks/useAuthContext";
import Header from "../../components/Header";

const PatientDashboard = ({ navigation }) => {
  const { user } = useAuthContext();

  React.useEffect(() => {
    console.log("User from Dashboard", user);
  }, []);

  return (
    <ScrollView style={styles.outer}>
      <View style={styles.container}>
        <Header name="Doctor Access" />
        <View style={styles.dashboardContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("SelectDocForAccessScreen");
              }}
            >
              <Image
                source={require("../../../assets/icons/test-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                Select Doctors to Access Medical Records
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("ViewDoctorsWithAccess");
              }}
            >
              <Image
                source={require("../../../assets/icons/record-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                View Doctors with Access
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    // backgroundColor: "#F7FEFF",
  },
  topPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 95,
    backgroundColor: "#00567D",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
  },
  titleMain: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    left: 120,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#D9D9D9",
  },
  profileImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "80%",
    height: "80%",
  },
  bellIcon: {
    width: 40,
    height: 40,
    right: 45,
    top: 3,
  },
  bellImage: {
    width: "60%",
    height: "90%",
  },
  dashboardContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 15,
  },
  dashboardButton: {
    width: 163,
    height: 200,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.11,
    shadowRadius: 3.05,
    elevation: 3,
  },
  dashboardImage: {
    width: "80%",
    height: "70%",
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  dashboardButtonText: {
    paddingHorizontal: 4,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  roundedPlusButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#3498db",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PatientDashboard;
