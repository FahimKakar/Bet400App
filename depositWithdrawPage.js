import React, { useState } from 'react';
import { SafeAreaView, Text, Button, TextInput, StyleSheet, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, withdraw } from './betSlice';
import * as Progress from 'react-native-progress';

const DepositWithdrawPage = () => {
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState('');
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.bet.balance);

  const handleTransaction = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount > 0) {
      setProgress(0.5); // Start the progress
      setTimeout(() => {
        if (isDeposit) {
          dispatch(deposit(numericAmount));
        } else {
          dispatch(withdraw(numericAmount));
        }
        setAmount('');
        setProgress(1); // Complete the progress
        setTimeout(() => setProgress(0), 1000); // Reset progress after delay
      }, 1000); // Simulate a delay for the transaction
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Current Balance: ${balance}</Text>
      <Switch
        value={isDeposit}
        onValueChange={(newValue) => setIsDeposit(newValue)}
      />
      <Text>{isDeposit ? 'Deposit' : 'Withdraw'}</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder={isDeposit ? 'Enter deposit amount' : 'Enter withdrawal amount'}
      />
      {progress > 0 && (
        <Progress.Bar progress={progress} width={200} />
      )}
      <Button
        title={isDeposit ? 'Deposit' : 'Withdraw'}
        onPress={handleTransaction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
  
});

export default DepositWithdrawPage;
