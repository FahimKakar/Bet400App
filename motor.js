import React, { useEffect, useState } from 'react';
import {
  Text, View, FlatList, TouchableOpacity, Animated, StyleSheet, SafeAreaView
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import BetPage from './betpage';
import Balance from './balance';
import DepositWithdrawPage from './depositWithdrawPage';

// Creating a stack navigator for navigating between screens
const Stack = createStackNavigator();

// API endpoint for fetching sports event data
const API = 'https://www.thesportsdb.com/api/v1/json/3/eventresults.php?id=652890';

// Function to render each item in the FlatList
const renderItem = ({ item }) => <Item name={item.strPlayer} />;

// Item component representing each sports event
function Item(props) {
  const navigation = useNavigation();  // Hook to access navigation functionality
  const [scale] = useState(new Animated.Value(1));  // State for managing animation scale

  // Handler for press-in animation
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: false,
    }).start();
  };

  // Handler for press-out animation
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  // Applying the scale transformation to the button style
  const animatedStyle = {
    transform: [{ scale: scale }],
  };

  // Handler for pressing the item, navigating to the Bet page
  const handlePress = () => {
    navigation.navigate('Bet', { teamName: props.name });
  };
// Render view for each item
  return (
    <SafeAreaView>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.buttonText}>{props.name}</Text>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

// Component for displaying the list of sports events
function Display() {
  const [apiData, setApiData] = useState([]);  // State for storing fetched API data

  // useEffect hook for fetching data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setApiData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Render view for the Display component
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.text}>Place your bet on the following Drivers!</Text>
      <FlatList
        data={apiData}
        keyExtractor={(item) => item.idResult} 
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
// Main component setting up the navigation stack
export default function Motor({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Racing" 
        component={Display} 
        options={{ 
          headerTitle: () => <Text style={styles.headerTitle}>Racing</Text>,
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
    fontSize: 18,
    alignSelf: 'center',
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