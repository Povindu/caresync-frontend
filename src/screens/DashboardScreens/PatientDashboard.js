import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const PatientDashboard = ({ navigation }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  React.useEffect(() => {
    console.log("User from Dashboard", user);
    //TODO add a waiting modal if user is not found
  }, []);

  return (
    <ScrollView style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.topPanel}>
          <Text style={styles.titleMain}>CareSync</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              navigation.navigate("MyprofileScreen");
            }}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../../../assets/Person.png")}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellIcon}>
            <Image
              source={require("../../../assets/Notification.png")}
              style={styles.bellImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dashboardContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("DisplayMedicalRecords");
              }}
            >
              <Image
                source={require("../../../assets/icons/record-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                View Medical Records
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.dashboardButton}
              onPress={navigateToMedicalHistory}
            >
              <Image
                source={require("../../../assets/DocImage.png")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                View Medical History
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("TestSelection");
              }}
            >
              <Image
                source={require("../../../assets/icons/test-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                Perform Medical Tests
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("MedicationView");
              }}
            >
              <Image
                source={require("../../../assets/icons/medicine-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                View Medication Plans
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("MedicalIncidentHomeScreen");
              }}
            >
              <Image
                source={require("../../../assets/DocImage.png")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                Add Medical Incident
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("DocAccessHomeScreen");
              }}
            >
              <Image
                source={require("../../../assets/icons/doctor-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>
                Give Access to Doctors
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("ViewExternalTestResults");
              }}
            >
              <Image
                source={require("../../../assets/icons/result-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>View Test Results</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                navigation.navigate("BodyCompositionScreen");
              }}
            >
              <Image
                source={require("../../../assets/icons/result-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>Your Health</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dashboardButton}
              onPress={() => {
                logout();
                navigation.popToTop();
                navigation.navigate("WelcomeScreen");
              }}
            >
              <Image
                source={require("../../../assets/icons/logout-icon.jpg")}
                style={styles.dashboardImage}
              />
              <Text style={styles.dashboardButtonText}>LogOut</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.row}></View> */}
        </View>

        {/* <TouchableOpacity style={styles.roundedPlusButton}>
          <Text style={styles.plusButtonText}>+</Text>
        </TouchableOpacity> */}
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
    height: 163,
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
