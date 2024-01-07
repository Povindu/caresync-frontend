import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TestHeader from './Components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TestSelection from './Components/TestSelectionPage/TestSelection';

export default function App() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <TestSelection/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
