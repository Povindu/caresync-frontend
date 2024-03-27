import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const TouchableIconUp = ({ onPress, iconName, iconSize, iconColor }) => (

  <TouchableOpacity  onPress={onPress}>
    <AntDesign name={iconName} size={iconSize} color={iconColor} />
  </TouchableOpacity>
);
export default TouchableIconUp;
