import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
const DoctorDashboard = ({navigation}) => {
    const navigateToMedicalHistory = () => {
        navigation.navigate('PatientsScreen');
    };
  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <Text style={styles.titleMain}>CareSync</Text>
        <TouchableOpacity style={styles.profileButton}>
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
        <TouchableOpacity style={styles.dashboardButton}  onPress={navigateToMedicalHistory}>
          <Image
            source={require("../../../assets/DocImage.png")}
            style={styles.dashboardImage}
           
          />
          <Text style={styles.dashboardButtonText}>View Patient Summary</Text>
        </TouchableOpacity>

        
      </View>

      <TouchableOpacity style={styles.roundedPlusButton}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FEFF",
  },
  topPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 95,
    backgroundColor: "#00567D",
    paddingHorizontal: 15,
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 15,
  },
  dashboardButton: {
    width: 163,
    height: 163,
    backgroundColor: "#D9F8FF",
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
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
});

export default DoctorDashboard;
