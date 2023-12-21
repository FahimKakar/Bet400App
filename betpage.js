import React, { useState } from 'react';
import { SafeAreaView, Text, View, Button, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { placebet, odds } from './betSlice';
import * as Progress from 'react-native-progress';

export default function BetPage({ route }) {
  const { teamName } = route.params;
  const [bet, setBet] = useState('');
  const dispatch = useDispatch();
  const updated = useSelector((state) => state.bet.value);
  const [placedBet, setPlacedBet] = useState(false);
  const [progress, setProgress] = useState(1);

  const handleChange = (value) => {
    setBet(value);
    
   
  };

  const handlePlaceBet = () => {
    const betValue = parseFloat(bet);
    const oddsArray = [1.5, 2.9, 1.3, 4.7, 1.95, 2.66, 3.2, 1.46, 2.92, 1.09];
    const randomIndex = Math.floor(Math.random() * oddsArray.length);
    const randomNum = oddsArray[randomIndex];
    dispatch(placebet(betValue));
    dispatch(odds( randomNum ));
    
  };

  const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>{teamName}</Text>
    <Text style={styles.text}>Enter Bet:</Text>
    <TextInput
      style={styles.input}
      value={bet}
      onChangeText={handleChange}
      keyboardType="numeric"
    />
    <CustomButton title="Check Odds" onPress={handlePlaceBet} />
    <Text style={styles.text}>You win:</Text>
    <Text style={styles.text}>{updated}</Text>
    <Modal
      animationType="slide"
      transparent={false}
      visible={placedBet}
      onRequestClose={() => setPlacedBet(!placedBet)}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>You have placed your bet!</Text>
        <Progress.Bar progress={progress} />
        <CustomButton title="Close" onPress={() => setPlacedBet(!placedBet)} />
      </SafeAreaView>
    </Modal>
    <CustomButton title="Place Bet" onPress={() => setPlacedBet(!placedBet)} />
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    color: '#2E8B57',
    fontSize: 18,
  },
  input:{
    color: '#2E8B57',
    fontSize: 18,
    borderColor: '#2E8B57',
    borderWidth: 2,
    margin: 5,
  },
  title:{
    color: '#2E8B57',
    fontSize: 25,
    fontWeight: 700,
  }
  
});
