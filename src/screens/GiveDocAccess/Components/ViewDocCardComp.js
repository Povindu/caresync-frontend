import { View, StyleSheet, Text, Pressable, SafeAreaView } from "react-native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../Services/AuthService";
import { baseUrl } from "../../../constants/constants";

function DocCard({ navigation, name, DocID, DocDocuID }) {
  const { user } = useAuthContext();

  async function removeAccess() {
    // console.log("docId", DocDocuID);
    // console.log(`${baseUrl}/patients/removeDocAccess/${user?._id}`);

    api
      .patch(`${baseUrl}/patients/removeDocAccess/${user?._id}`, {
        docID: DocDocuID,
      })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.cardIn}>Doctor Name: {name}</Text>
          <Text style={styles.cardIn}>Doc ID: {DocID}</Text>
          <View style={styles.btnCont}>
            <Pressable onPress={removeAccess}>
              <Text style={styles.DeleteBtn}>Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default DocCard;

const styles = StyleSheet.create({
  background: {
    // backgroundColor:'#00567D'
  },

  card: {
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  cardIn: {
    // backgroundColor: '#D9F8FF',
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  DeleteBtn: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 10,
    width: 80,
  },
  btnCont: {
    alignItems: "flex-end",
  },
});
