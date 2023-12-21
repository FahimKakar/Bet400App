import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      const storedCredentials = await AsyncStorage.getItem('userCredentials');
      if (!storedCredentials) {
        setLoginMessage("No stored credentials found.");
        return;
      } 

      const { username: storedUsername, password: storedPassword } = JSON.parse(storedCredentials);

      if (username === storedUsername && password === storedPassword) {
        navigation.navigate('Home');
        setLoginMessage('');
      } else {
        setLoginMessage("Invalid username or password.");
      }
    } catch (e) {
      setLoginMessage("An error occurred while trying to log in.");
    }
  };

  return (
     <View style={styles.container}>
      <Text style={styles.title}>Welcome to Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="black" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="black"
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.message}>{loginMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  message: {
    color: 'red',
    marginTop: 20,
  },
});

export default Login;
