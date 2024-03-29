
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TestModal = ({ onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <Text>Prescription Modal Content</Text>
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEFFFB',
  },
});

export default TestModal;
