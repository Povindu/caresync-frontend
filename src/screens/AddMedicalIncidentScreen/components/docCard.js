import { View, StyleSheet, Text, Pressable, SafeAreaView } from "react-native";

function DocCard({ navigation, name, DocID, setSelected, onClose, id }) {

  const handlePress = () => {
    setSelected(id);
    console.log("Doc Card Selected Doctor:", id);
    onClose();
  }

  return (
    <SafeAreaView>
      <View style={{}}>
        <View style={styles.card}>
          <Pressable onPress={handlePress}>
            <Text style={styles.cardIn}>Name: {name}</Text>
            <Text style={styles.cardIn}>Doctor ID: {DocID}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default DocCard;

const styles = StyleSheet.create({


  card: {
    borderRadius: 5,
    padding: 2,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 5,
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
    marginBottom: 0,
  },
});

