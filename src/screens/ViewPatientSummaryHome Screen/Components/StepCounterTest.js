import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import api from "../../../Services/AuthService";
import { baseUrl } from "../../../constants/constants";
import { DataTable } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

function StepCounterTest({ PID }) {
  const [testResult, setTestResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState([]);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await api.get(`${baseUrl}/stepCounterTests/${PID}`);
      console.log("Response from backend:", response.data);
      setTestResult(response.data);
    } catch (error) {
      console.error("Error fetching stepCounterResults:", error);
    }
  };

  const testResultGraphModal = (data) => {
    if (data.length === 0) {
      Alert.alert(
        "No test results to display",
        "Patient hasn't performed any tests to view the graph"
      );
      return;
    }
    // Sort the data based on date in ascending order
    const sortedData = data
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setSelectedTestData(sortedData);
    setModalVisible(true);
  };

  // Function to extract month and day from the date
  const extractMonthAndDay = (date) => {
    console.log("Date: ", date);
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);

    // Combine day and month components
    const formattedDate = `${month}/${day}`;
    console.log("Formatted Date: ", formattedDate);

    return formattedDate;
  };
  // Function to map steps to scale
  const mapStepsToScale = (steps) => {
    const scaledValue = parseInt(steps); // Convert steps to integer
    return Math.floor(scaledValue / 500) * 500; // Map it to a scale of 0 to 6000 increasing by 500
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Step Counter Test</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => testResultGraphModal(testResult)}
        >
          <Text>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tablecontainer}>
        <Text style={styles.headtext}>Past Results</Text>
        <View style={styles.subson}>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}> Time (H:M:S)</Text>
          <Text style={styles.text}>Steps</Text>
          <Text style={styles.text}>Distance</Text>
        </View>
      </View>

      <DataTable>
        {console.log("Test Result: ", testResult)}
        {testResult.length > 0 &&
          testResult.map((data, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell
                style={{
                  justifyContent: "center",
                  backgroundColor: "#FEFFE0",
                  marginBottom: 5,
                  paddingLeft: 15,

                  paddingRight: 25,
                  borderBottomLeftRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              >
                {data.date}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  justifyContent: "center",
                  backgroundColor: "#FEFFE0",
                  marginBottom: 5,
                }}
              >
                {data.stopwatchTime}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  justifyContent: "center",
                  backgroundColor: "#FEFFE0",
                  marginBottom: 5,
                }}
              >
                {data.steps}
              </DataTable.Cell>

              <DataTable.Cell
                style={{
                  justifyContent: "center",
                  backgroundColor: "#FEFFE0",
                  marginBottom: 5,
                  paddingRight: 10,

                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                {data.distance}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Step Counting Test Graph</Text>
            <LineChart
              data={{
                labels: selectedTestData
                  .map((data) => extractMonthAndDay(data.date))
                  .reverse(),
                datasets: [
                  {
                    data: selectedTestData
                      .map((data) => mapStepsToScale(data.steps))
                      .reverse(),
                  },
                ],
              }}
              width={350}
              height={270}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",

                yAxisLabelPosition: "topLeft",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForVerticalLabels: {
                  fontWeight: "bold", // Set the font weight of vertical labels
                },
                propsForHorizontalLabels: {
                  fontWeight: "bold", // Set the font weight of horizontal labels
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Steps</Text>
            </View>
            <View style={styles.overlayDate}>
              <Text style={styles.overlayTextDate}>Month/Day</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default StepCounterTest;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  titlecontainer: {
    marginTop: 15,

    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
  },
  tablecontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFFE0",
    marginTop: 10,
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: 10,
    borderRadius: 20,
  },
  headtext: {
    fontSize: 20,
    padding: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  subson: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    margin: 10,
  },
  text: {
    fontSize: 14,
    padding: 10,
    paddingLeft: 10,
    justifyContent: "center",
    fontWeight: "bold",
  },
  rowContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFFE0",
    marginTop: 10,
    margin: "10%",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#FBDABB",
    height: 30,
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#FBDABB",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    top: 160, // Adjust as needed
    left: 10, // Adjust as needed
  },
  overlayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    transform: [{ rotate: "-90deg" }],
  },
  overlayTextDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  overlayDate: {
    position: "absolute",
    top: 310, // Adjust as needed
    left: 150, // Adjust as needed
  },
});
