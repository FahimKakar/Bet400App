import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true); 

  useEffect(() => {
    let newProgress = 0;
    newProgress += username.length > 0 ? 0.33 : 0;
    newProgress += password.length > 0 ? 0.33 : 0;
    newProgress += age.length > 0 ? 0.34 : 0;
    setProgress(newProgress);
  }, [username, password, age]);

  const handleSignup = async () => {
    const userAge = parseInt(age, 10);
    if (userAge >= 19) {
      try {
        await AsyncStorage.setItem('userCredentials', JSON.stringify({ username, password }));
        setIsModalVisible(false); 
        navigation.navigate('Login'); 
        setMessage('');
      } catch (e) {
        setMessage("Unable to save user data. Please try again later.");
      }
    } else {
       setMessage("You must be at least 19 years old to sign up.");
    }
  }; 

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>Signup Here</Text>
        <Progress.Bar progress={progress} width={200} color="#5E84E2" style={styles.progressBar} />
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
        <TextInput 
          style={styles.input} 
          placeholder="Age" 
          placeholderTextColor="black" 
          keyboardType="numeric" 
          value={age} 
          onChangeText={setAge} 
        />
        <Button title="Signup" onPress={handleSignup} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  progressBar: {
    height: 10,
    alignSelf: 'stretch',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  message: {
    color: 'red',
    marginTop: 20,
  },
});

export default Signup;
