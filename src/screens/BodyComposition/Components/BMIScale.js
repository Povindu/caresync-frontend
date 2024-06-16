import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Rect, G, Text as SvgText } from "react-native-svg";

const BMIScale = ({ bmi }) => {
  if (bmi === undefined || bmi === null) {
    return <Text style={styles.errorText}>BMI data is not available.</Text>;
  }
  const progress = Math.min(bmi / 40, 1); // Assuming the scale goes from 0 to 40

  return (
    <View style={styles.container}>
      <Text style={styles.bmiText}>Current BMI</Text>
      <Text style={styles.bmiValue}>{Math.round(bmi * 10) / 10}</Text>

      <Svg
        height="50"
        width="300"
        viewBox="0 0 300 40"
        style={{ marginBottom: 20 }}
      >
        <G>
          <Rect x="0" y="15" width="300" height="10" fill="#eee" />
          <Rect
            x="0"
            y="15"
            width={300 * progress}
            height="10"
            fill={
              progress < 0.4625 ? "green" : progress < 0.625 ? "yellow" : "red"
            }
          />
        </G>

        <SvgText x="75" y="42" fontSize="15" fill="black">
          18.5
        </SvgText>
        <SvgText x="185" y="42" fontSize="15" fill="black">
          25
        </SvgText>
      </Svg>
      <Text style={styles.category}>
        {bmi < 18.5
          ? "Underweight"
          : bmi < 24.9
          ? "Normal weight"
          : bmi < 29.9
          ? "Overweight"
          : "Obesity"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
    height: 200,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  bmiText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "green",
  },
  category: {
    fontSize: 16,
    marginTop: 10,
    color: "black",
  },
  svgtext: {
    margin: 20,
  },
});

export default BMIScale;
