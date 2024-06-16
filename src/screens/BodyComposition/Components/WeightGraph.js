import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { baseUrl } from "../../../constants/constants";
import axios from "axios";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { LineChart } from "react-native-chart-kit";

function WeightGraph() {
  const { user } = useAuthContext();
  const [details, setDetails] = useState([]);

  const [id, setId] = useState();

  useEffect(() => {
    if (user && user._id) {
      getWeights(user._id);
    }
  }, [user]);

  const getWeights = (userId) => {
    axios
      .get(`${baseUrl}/patients/${userId}`)
      .then((response) => {
        const weights = response.data.pastWeights || [];

        setDetails(weights);
        console.log("Weight Details: ", weights);
        console.log("Weight: ", response.data.weight);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  // Ensure details is always an array
  const safeDetails = Array.isArray(details) ? details : [];

  // Extract dates and weights for the graph
  const dates = safeDetails.map((entry) =>
    new Date(entry.date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    })
  );

  const datesNew = safeDetails.map(
    (entry) =>
      new Date(entry.date)
        .toLocaleDateString("en-GB", {
          month: "short",
          day: "2-digit",
        })
        .replace(/\s/g, " ") //replace day and month
  );

  const weights = safeDetails.map((entry) => entry.weight);
  console.log(weights);
  // Extract the first and last dates for the date range display
  const firstDate = datesNew.length > 0 ? datesNew[0] : null;
  const lastDate = datesNew.length > 0 ? datesNew[datesNew.length - 1] : null;

  //   // Calculate average, min, and max weights
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  console.log("Sum of Weights: ", totalWeight);
  let sum = 0;
  let num = totalWeight;

  while (num !== 0) {
    sum += num % 100; // Add the last digit to sum
    num = Math.floor(num / 100); // Remove the last digit
  }
  console.log("Sum of Digits of Total Weight: ", sum);
  // Calculate the average weight
  // let averageWeight = 0;
  // if (weights.length > 0) {
  //   averageWeight = sum / weights.length;
  // }
  // console.log("Average Weight: ", averageWeight);
  // const averageWeightFormatted = !isNaN(averageWeight)
  //   ? averageWeight.toFixed(1)
  //   : "N/A"; // Format to 1 decimal place
  const averageWeight = sum / weights.length;
  // Format to 1 decimal place using Math.round
  const averageWeightFormatted = (
    Math.round(averageWeight * 10) / 10
  ).toString();
  const minWeight = weights.length > 0 ? Math.min(...weights) : null;
  const maxWeight = weights.length > 0 ? Math.max(...weights) : null;

  if (weights.length !== 1) {
    return (
      <View style={styles.container}>
        {details.length === 0 && <Text>No data to show.</Text>}
        <View style={styles.dateContainer}>
          {firstDate && lastDate && (
            <Text style={styles.dateRange}>
              {firstDate} – {lastDate} ({details.length} records)
            </Text>
          )}
        </View>
        {averageWeightFormatted && minWeight && maxWeight && (
          <View style={styles.statsContainer}>
            <View style={styles.statsSubContainer}>
              <Text style={styles.statsText}>Avg</Text>
              <Text style={styles.statsNumAvg}>
                {averageWeightFormatted} kg
              </Text>
            </View>
            <View style={styles.statsSubContainer}>
              <Text style={styles.statsText}>Min</Text>
              <Text style={styles.statsNumMIn}>{minWeight} kg</Text>
              <Text style={styles.statsText}>Max</Text>
              <Text style={styles.statsNumMax}>{maxWeight} kg</Text>
            </View>
          </View>
        )}
        {details.length > 0 ? (
          <LineChart
            data={{
              labels: dates,

              datasets: [
                {
                  data: weights,
                },
              ],
            }}
            width={Dimensions.get("window").width - 16} // from react-native
            height={240}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#36bfb6",
              backgroundGradientFrom: "#ffa726",
              backgroundGradientTo: "#42ebe0",

              decimalPlaces: 0, // optional, defaults to 2dp

              // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                stroke: "", // Color for background lines
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "black",
                fill: "black",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>No weight data available</Text>
        )}
        {/* <View style={styles.overlay}>
        <Text style={styles.overlayText}>Weight (kg)</Text>
      </View>
      <View style={styles.overlayDate}>
        <Text style={styles.overlayTextDate}>Month/Day</Text>
      </View> */}
      </View>
    );
  } else {
    return null;
  }
}
export default WeightGraph;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  dateContainer: {
    alignSelf: "flex-start", // Align text to the start (left)
    marginLeft: 30, // Add some padding from the left sides
  },
  dateRange: {
    color: "black", // Adjust color to match your theme
    fontSize: 16,
    marginBottom: 10, // Space between the text and the graph
  },
  statsContainer: {
    marginBottom: 10, // Space between the stats and the graph
    alignSelf: "flex-start", // Align text to the start (left)
    marginLeft: 30, // Add some padding from the left sides
    flexDirection: "row", // Align the stats in a row
    marginTop: 0, // Space between the text and the graph
  },
  statsSubContainer: {
    flexDirection: "row", // Align the stats in a row
    marginRight: 20, // Space between the stats
    alignItems: "baseline", // Align the text in the center
  },
  statsText: {
    fontSize: 16,
    color: "black",
    marginRight: 5, // Space between the stats
  },
  statsNumAvg: {
    fontSize: 24,
    color: "green",
  },
  statsNumMIn: {
    fontSize: 24,
    color: "gold",
    marginRight: 10, // Space between the stats
  },
  statsNumMax: {
    fontSize: 24,
    color: "red",
    marginRight: 10, // Space between the stats
  },

  overlay: {
    position: "absolute",
    top: 120, // Adjust as needed
    left: -10, // Adjust as needed
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
    top: 258, // Adjust as needed
    left: 150, // Adjust as needed
    paddingBottom: 10,
  },
});
