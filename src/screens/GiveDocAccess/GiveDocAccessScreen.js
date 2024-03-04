import { View, StyleSheet, Text, Pressable, SafeAreaView, Alert } from "react-native";
import Header from "../../components/Header";
import axios from "axios";

const baseUrl = "http://10.0.2.2:4000/api/doctors";
import { useEffect, useState } from "react";

function GiveDocAccess({ navigation, route }) {
  const [doc, setDoc] = useState("");

  const showAlert = (name) =>
  Alert.alert(
    'Access Granted',
    'Medical history access granted to '+ name + " successfully.",
    [
      {
        text: 'Ok',
        // onPress: () => Alert.alert('Access Granted'),
        style: 'ok',
      },
    ],
    {
      cancelable: true,
    },
  );

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const configurationObject = {
          method: "get",
          url: `${baseUrl}/` + route.params.id,
        };
        // console.log(configurationObject.url);
        const response = await axios(configurationObject);
        // console.log(response.data);
        setDoc(response.data);
      } catch (error) {
        console.log("error " + error);
      }
    };

    fetchDoctor();
  }, []);

  return (
    <SafeAreaView>
      <Header name={"Grant Access"} />
      <View style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Doctors Name:   {doc.name}</Text>
          <Text style={styles.cardText}>DoctorID:   {doc.doctorID}</Text>
          <Text style={styles.cardText}>Specialization:  {doc.spec}</Text>
          {/* <Text>Doctor Description:</Text> */}
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
          <Pressable onPress={() => showAlert(doc.name)}>
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

  cardText:{
    fontSize:16,
    textAlign:'auto'
  },  
  

  access_btn: {
    textAlign: "center",
    backgroundColor: "#00567D",
    color: "white",
    padding: 10,
    marginHorizontal: 50,
    marginTop: 20,
    borderRadius: 10,
    fontSize:18,
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
