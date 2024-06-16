import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { baseUrl } from "../../../constants/constants";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { LineChart } from "react-native-chart-kit";
import BMIScale from "./BMIScale";

function BMIGraph() {
  const { user } = useAuthContext();
  const [details, setDetails] = useState([]);
  const [height, setHeight] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setHeight(response.data.height);
        setLoading(false);
        console.log("Weight Details: ", weights);
        console.log("Height: ", response.data.height);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        setLoading(false);
      });
  };

  // Ensure details is always an array
  const safeDetails = Array.isArray(details) ? details : [];
  const weights = safeDetails.map((entry) => entry.weight);
  // // Check if details array is empty
  // if (safeDetails.length === 0) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.noDataText}>No data to show.</Text>
  //     </View>
  //   );
  // }

  // Memoize BMI calculations to avoid unnecessary re-computation
  // const bmiValues = useMemo(() => {
  //   //useMemo is a React hook that helps optimize performance by memoizing the results of expensive computations
  //   console.log("Height: ", height);
  //   if (!height) return [];
  //   const heightInMeters = height / 100; // Convert height to meters
  //   return safeDetails.map((entry) => {
  //     const bmi = entry.weight / (heightInMeters * heightInMeters);
  //     return parseFloat(bmi.toFixed(2)); // Return BMI with 2 decimal places
  //   });
  // }, [safeDetails, height]);
  const bmiValues = useMemo(() => {
    console.log("Height: ", height);
    if (!height) return [];

    const heightInMeters = height / 100; // Convert height to meters

    return safeDetails.map((entry) => {
      const bmi = entry.weight / (heightInMeters * heightInMeters);
      const roundedBMI = Math.round(bmi * 100) / 100; // Round BMI to 2 decimal places
      return roundedBMI;
    });
  }, [safeDetails, height]);
  console.log("BMI Values: ", bmiValues);

  // // Calculate average, min, and max BMI
  // const averageBMI = useMemo(() => {
  //   if (bmiValues.length === 0) return 0;
  //   const totalBMI = bmiValues.reduce((acc, bmi) => acc + bmi, 0);
  //   return (totalBMI / bmiValues.length).toFixed(2); // Format to 2 decimal places
  // }, [bmiValues]);
  const averageBMI = useMemo(() => {
    if (bmiValues.length === 0) return 0;

    const totalBMI = bmiValues.reduce((acc, bmi) => acc + bmi, 0);
    const average = totalBMI / bmiValues.length;

    // Use Math.round to round to 2 decimal places
    const averageBMIRounded = Math.round(average * 100) / 100;

    return averageBMIRounded.toString(); // Convert to string if needed
  }, [bmiValues]);
  console.log("Average BMI: ", averageBMI);

  // const minBMI = useMemo(() => {
  //   return bmiValues.length > 0 ? Math.min(...bmiValues).toFixed(2) : null;
  // }, [bmiValues]);

  const minBMI = useMemo(() => {
    if (bmiValues.length === 0) return null;

    // Calculate minimum BMI
    const min = Math.min(...bmiValues);

    // Use Math.round to round to 2 decimal places
    const minBMIRounded = Math.round(min * 100) / 100;

    return minBMIRounded.toString(); // Convert to string if needed
  }, [bmiValues]);

  // const maxBMI = useMemo(() => {
  //   return bmiValues.length > 0 ? Math.max(...bmiValues).toFixed(2) : null;
  // }, [bmiValues]);

  const maxBMI = useMemo(() => {
    if (bmiValues.length === 0) return null;

    // Calculate maximum BMI
    const max = Math.max(...bmiValues);

    // Use Math.round to round to 2 decimal places
    const maxBMIRounded = Math.round(max * 100) / 100;

    return maxBMIRounded.toString(); // Convert to string if needed
  }, [bmiValues]);

  // Extract dates for the graph
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

  // Extract the first and last dates for the date range display
  const firstDate = datesNew.length > 0 ? datesNew[0] : null;
  const lastDate = datesNew.length > 0 ? datesNew[datesNew.length - 1] : null;
  if (weights.length !== 1) {
    return (
      <View style={styles.container}>
        {details.length === 0 && height === 0 && <Text>No data</Text>}
        <View style={styles.dateContainer}>
          {firstDate && lastDate && (
            <Text style={styles.dateRange}>
              {firstDate} – {lastDate} ({details.length} records)
            </Text>
          )}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsSubContainer}>
            {averageBMI ? (
              <>
                <Text style={styles.statsText}>Avg</Text>
                <Text style={styles.statsNumAvg}>{averageBMI}</Text>
              </>
            ) : (
              ""
            )}
          </View>
          <View style={styles.statsSubContainer}>
            {minBMI && maxBMI ? (
              <>
                <Text style={styles.statsText}>Min</Text>
                <Text style={styles.statsNumMIn}>{minBMI}</Text>
                <Text style={styles.statsText}>Max</Text>
                <Text style={styles.statsNumMax}>{maxBMI}</Text>
              </>
            ) : (
              ""
            )}
          </View>
        </View>

        {loading ? (
          <Text>Loading...</Text>
        ) : details.length > 0 ? (
          <LineChart
            data={{
              labels: dates,

              datasets: [
                {
                  data: bmiValues,
                },
              ],
            }}
            width={Dimensions.get("window").width - 16} // from react-native
            height={240}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#bf766f",
              backgroundGradientFrom: "#ffa726",
              backgroundGradientTo: "#eda6e6",
              decimalPlaces: 2, // Display 2 decimal places for BMI
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
                stroke: "",
              },

              yAxisMinimum: Math.min(...bmiValues) - 5, // Adjust y-axis minimum for better visualization
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          // <LineChart
          //   data={{
          //     labels: dates,
          //     datasets: [
          //       {
          //         data: bmiValues,
          //         color: (opacity = 0) => `rgba(33, 204, 130, ${opacity})`, // Line color
          //         strokeWidth: 5, // Line thickness
          //       },
          //     ],
          //   }}
          //   width={Dimensions.get("window").width - 16} // from react-native
          //   height={240}
          //   yAxisLabel=""
          //   yAxisSuffix=""
          //   chartConfig={{
          //     backgroundColor: "white", // Background color
          //     backgroundGradientFrom: "white", // Gradient start
          //     backgroundGradientTo: "white", // Gradient end
          //     decimalPlaces: 2, // Display 2 decimal places for BMI
          //     color: () => "white", // Axis label color
          //     labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, // Label color
          //     style: {
          //       borderRadius: 16,
          //     },
          //     propsForDots: {
          //       r: "6",
          //       strokeWidth: "2",
          //       stroke: "#21a66c", // Dot border color
          //       fill: "#21a66c", // Dot fill color
          //     },
          //     propsForBackgroundLines: {
          //       strokeDasharray: "", // Remove dashed lines
          //       stroke: "", // Line color
          //     },
          //     fillShadowGradient: "#114d33", // Background fill
          //     fillShadowGradientOpacity: 0, // Make the fill transparent
          //   }}
          //   bezier
          //   style={{
          //     marginVertical: 8,
          //     borderRadius: 16,
          //   }}
          // />
          <Text>No BMI data available</Text>
        )}
        {/* <View style={styles.overlay}>
        <Text style={styles.overlayText}>BMI</Text>
      </View>
      <View style={styles.overlayDate}>
        <Text style={styles.overlayTextDate}>Month/Day</Text>
      </View> */}
        <BMIScale bmi={bmiValues[bmiValues.length - 1]} />
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.scale}>
          <BMIScale bmi={bmiValues[bmiValues.length - 1]} />
        </View>
      </>
    );
  }
}

export default BMIGraph;

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
    left: 6, // Adjust as needed
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
    top: 228, // Adjust as needed
    left: 150, // Adjust as needed
    paddingBottom: 10,
  },
  scale: {
    alignItems: "center",
  },
});
