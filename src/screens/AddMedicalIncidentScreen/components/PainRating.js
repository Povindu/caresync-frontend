import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PainRating = ({ text, icon, painRating, setPainRating }) => {
  const handleRating = (value) => {
    setPainRating(value);
  };

  const getColorForRating = (rating) => {
    const maxRating = 10; // Maximum rating
    const intensity = rating / maxRating; // Intensity of color based on rating
    const lowColor = "#808080"; // pink
    const highColor = "#FF0F0F"; //red
    // Adjusting color contrast by increasing the intensity of the high color
    const adjustedIntensity = intensity * 1.1; // Adjust the multiplier to increase or decrease contrast
    // Interpolate between low and high colors based on adjusted intensity
    const r = Math.round(
      (1 - adjustedIntensity) * parseInt(lowColor.substring(1, 3), 16) +
        adjustedIntensity * parseInt(highColor.substring(1, 3), 16)
    );
    const g = Math.round(
      (1 - adjustedIntensity) * parseInt(lowColor.substring(3, 5), 16) +
        adjustedIntensity * parseInt(highColor.substring(3, 5), 16)
    );
    const b = Math.round(
      (1 - adjustedIntensity) * parseInt(lowColor.substring(5), 16) +
        adjustedIntensity * parseInt(highColor.substring(5), 16)
    );
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {text} {painRating}/10
      </Text>
      <View style={styles.ratingContainer}>
        {[...Array(10)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconContainer}
            onPress={() => handleRating(index + 1)}
          >
            <FontAwesome
              name={icon}
              size={30}
              color={
                index < painRating ? getColorForRating(index + 1) : "#D4D4D4"
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    padding: 5,
  },
});

export default PainRating;
