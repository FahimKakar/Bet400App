import React from 'react';
import { TouchableOpacity, SafeAreaView, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Balance = () => {

  const balance = useSelector((state) => state.bet.balance);
  console.log('Current balance from Redux:', balance);

  
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.balanceContainer}>
      <Text style={styles.balanceText}>Balance: ${balance}</Text>

      <GreenButton title="Deposit/Withdraw" onPress={() => navigation.navigate('Deposit/Withdraw')} />
    </SafeAreaView>
  );
};


const GreenButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.greenButton} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  balanceText: {
    marginRight: 10,
    fontSize: 14,
  },
  greenButton: {
    backgroundColor: '#2E8B57',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Balance;
