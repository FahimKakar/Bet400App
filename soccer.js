import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import BetPage from './betpage';
import Balance from './balance';
import DepositWithdrawPage from './depositWithdrawPage';


const Stack = createStackNavigator();
const API =
  'https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=38&s=2014-2015';

const renderItem = ({ item }) => (
  <Item homeName={item.strAwayTeam} awayName={item.strHomeTeam} />
);

function Item(props) {
  const navigation = useNavigation();
 const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scale }],
  };
  const handlepressHome = ()=>{
    navigation.navigate('Bet', { teamName: props.homeName });
  }
  const handlepressAway = ()=>{
    navigation.navigate('Bet', { teamName: props.awayName });
  }
 

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlepressHome}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={styles.buttonText}>{props.homeName}</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.text}>vs</Text>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlepressAway}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={styles.buttonText}>{props.awayName}</Text>
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
function Display() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.events);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
    <Text style={styles.text}>Place your bet on the following Matches!</Text>    
      <FlatList
        data={apiData}
        keyExtractor={(item) => item.idEvent}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default function Soccer({ navigation }) {
  return (
     <Stack.Navigator>
    <Stack.Screen 
        name="Soccer" 
        component={Display} 
        options={{ 
          headerTitle: () => <Text style={styles.headerTitle}>Soccer</Text>,
          headerRight: () => <Balance />,
          headerStyle: styles.header, 
          headerRightContainerStyle: styles.headerRight,
        }} 
      />
      <Stack.Screen name="Bet" component={BetPage} />
      <Stack.Screen name="Deposit/Withdraw" component={DepositWithdrawPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#DCDCDC',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    margin: 10, 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 50, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  text: {
    color: '#2E8B57',
    fontSize: 18
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    height: 100,
    backgroundColor: '#2E8B57',
  },
  headerRight: {  
    marginRight: 10,
  },
});
