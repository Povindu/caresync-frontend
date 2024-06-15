import React from "react";
import { View, Text } from "react-native";

const SentenceBreaker = ({ sentence }) => {
  // Split the sentence into words
  const words = sentence.split(" ");

  // Divide the words into groups of 4
  const dividedWords = [];
  for (let i = 0; i < words.length; i += 3) {
    dividedWords.push(words.slice(i, i + 3).join(" "));
  }

  return (
    <View>
      {dividedWords.map((part, index) => (
        <Text key={index}>{part}</Text>
      ))}
    </View>
  );
};

export default SentenceBreaker;
