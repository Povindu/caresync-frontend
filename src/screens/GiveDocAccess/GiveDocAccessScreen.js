import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import api from "../../Services/AuthService";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../constants/constants";

function GiveDocAccess({ navigation, route }) {
  const { user } = useAuthContext();
  const [doc, setDoc] = useState("");
  const patientID = user?._id;

  const fetchDoctor = async () => {
    api
      .get(`${baseUrl}/doctors/` + route.params.id)
      .then((response) => {
        setDoc(response.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const giveAccess = () => {
    console.log("Access Granted" + doc._id);
    api
      .patch(`${baseUrl}/doctors/addPatientAccess/${doc._id}`, {
        patientID: patientID,
      })
      .then((res) => {
        if (res) {
        }
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });

    api
      .patch(`${baseUrl}/patients/addDocAccess/${patientID}`, {
        docID: `${doc._id}`,
      })
      .then((res) => {
        if (res) {
        }
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const showAlert = () => {
    giveAccess();
    Alert.alert(
      "Access Granted",
      "Medical history access granted to " +
        doc.firstName +
        " " +
        doc._lastName +
        " successfully.",
      [
        {
          text: "Ok",
          style: "ok",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <SafeAreaView>
      <Header name={"Grant Access"} />

      <View style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Doctors Name: {doc.firstName + " " + doc.lastName}
          </Text>
          <Text style={styles.cardText}>DoctorID: {doc.medicalId}</Text>
          <Text style={styles.cardText}>
            Specialization: {doc.specialization}{" "}
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.dis_head}>Disclaimer</Text>
          <Text style={styles.dis_text}>
            Before proceeding, please note that by granting access to your
            personal data, you are consenting to share relevant health
            information with a licensed medical professional. This information
            will be used solely for the purpose of providing accurate medical
            advice and treatment. We prioritize the security and confidentiality
            of your data and adhere to strict privacy guidelines.
          </Text>
        </View>

        <View>
          <Pressable onPress={() => showAlert()}>
            <Text style={styles.access_btn}>Grant Access</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default GiveDocAccess;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    padding: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    textAlign: "center",
    margin: "auto",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },

  cardText: {
    fontSize: 16,
    textAlign: "auto",
  },

  access_btn: {
    textAlign: "center",
    backgroundColor: "#00567D",
    color: "white",
    padding: 10,
    marginHorizontal: 50,
    marginTop: 20,
    borderRadius: 10,
    fontSize: 18,
  },

  disclaimer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 8,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },

  dis_head: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
  },

  dis_text: {
    textAlign: "justify",
  },
});
