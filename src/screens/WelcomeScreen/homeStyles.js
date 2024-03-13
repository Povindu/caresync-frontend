import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7FEFF",
  },
  logo: {
    width: 2000,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleMain: {
    fontSize: 35,
    color: "#3A3A3A",

    bottom: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  bottomButton: {
    backgroundColor: "#30A8DE",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "45%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#AFD3E2",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  selectedButtonText: {
    color: "#00567D",

    fontWeight: "bold",
    fontSize: 23,
  },
});
export default styles;
