import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo, if not, import from appropriate library

const PainRating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pain Level: {rating}/10</Text>
      <View style={styles.ratingContainer}>
        {[...Array(10)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconContainer}
            onPress={() => handleRating(index + 1)}
          >
            <FontAwesome
              name="thermometer-half"
              size={30}
              color={index < rating ? "#FF6347" : "#A9A9A9"} // Selected and unselected color
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 5,
  },
});

export default PainRating;
