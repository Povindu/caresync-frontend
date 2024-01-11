import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image} from 'react-native';

const PatientLogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login details:', {
      username,
      password,
    });

    // This is for after successful go to PatientDashboard screen
    navigation.navigate('PatientDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login Screen</Text>

      <Image
        source={require("../../assets/doc.png")}
        style={styles.docimg}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PatientRegister')}>
        <Text style={styles.linkText}>New here? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FEFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#00567D',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#30A8DE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#00567D',
    marginTop: 10,
  },
});

export default PatientLogin;
