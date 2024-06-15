import { Pressable, View, Text, StyleSheet, Image } from "react-native";

function PatientGridTile({
  id,
  firstName,
  lastName,
  nic,
  email,
  color,
  blood,
  onPress,
  profileImage,
}) {
  return (
    <View style={[styles.gridItem, { backgroundColor: "#E3F7FF" }]}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={styles.button}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: profileImage }} style={styles.image} />

          <View style={styles.subcontainer}>
            <Text style={styles.title}>
              {firstName} {lastName}
            </Text>

            <Text style={styles.nic}>Patient ID :{id}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
export default PatientGridTile;
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginBottom: 8,
    marginTop: 5,
    marginLeft: 12,
    marginRight: 12,
    height: 90,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    paddingLeft: 50,
    fontWeight: "bold",
    fontSize: 18,
  },

  content: {
    flexDirection: "row",
  },
  nic: {
    marginTop: 8,
    paddingLeft: 50,
    fontSize: 15,
  },
  email: {
    paddingLeft: 50,
    marginTop: 5,
    fontSize: 15,
  },

  id: {
    paddingLeft: 300,
    fontSize: 15,
    marginTop: -20,
  },
  subcontainer: {
    flexDirection: "column",
    marginLeft: -20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
