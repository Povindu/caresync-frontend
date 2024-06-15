import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Header from "../../components/Header";

const MedicalIncidentDetailScreen = () => {
  return (
    <>
      <Header name="Add Details" />
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.coloumn}>
            <TouchableOpacity
              style={[{ backgroundColor: "#FFEBA5" }, styles.tiles]}
            >
              <Image
                source={require("../AddMedicalIncidentScreen/Images/img.png")}
                style={styles.img}
              />
              <Text style={styles.txt}>Add Symptoms</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ backgroundColor: "#A7F4FF" }, styles.tiles]}
            >
              <Image
                style={styles.img}
                source={require("../AddMedicalIncidentScreen/Images/img1.png")}
              />
              <Text style={styles.txt}>Add Appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ backgroundColor: "#94FFC5" }, styles.tiles]}
            >
              <Image
                style={styles.img}
                source={require("../AddMedicalIncidentScreen/Images/img2.png")}
              />
              <Text style={styles.txt}>Add Prescriptions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default MedicalIncidentDetailScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tiles: {
    padding: "2%",
    marginTop: "10%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    width: "93%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    marginVertical: "3%",
    marginHorizontal: "3%",
  },

  background: {
    backgroundColor: "#e3ffff",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },

  img: {
    marginTop: 13,
    alignSelf: "center",
  },
  txt: {
    fontSize: 16,
    alignSelf: "center",
  },
  coloumn: {
    flexDirection: "column",
    flex: 1,
  },
});
