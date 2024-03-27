import { View, StyleSheet, Text, Pressable, SafeAreaView } from "react-native";

function DocCard({ navigation, name, DocID, id }) {
  function onPressHandler() {
    navigation.navigate("GiveDocAccessScreen", { name, DocID, id });
  }

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.card}>
          <Pressable onPress={onPressHandler}>
            <Text style={styles.cardIn}>Doctor Name: {name}</Text>
            <Text style={styles.cardIn}>Doc ID: {DocID}</Text>
          </Pressable>
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
});

