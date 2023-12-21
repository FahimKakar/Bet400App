import { Text, SafeAreaView, StyleSheet, View, Button  } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Soccer from './soccer';
import Basketball from './basketball';
import Motor from './motor';
import Home from './home';
import { useSelector, useDispatch, Provider } from 'react-redux';
import store from './store';
import Signup from './Signup';
import Login from './Login';




const Tab = createMaterialTopTabNavigator();

export default function App() {
  
  return (
     <Provider store={store}>
     
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { paddingTop: 30, paddingLeft: 10, paddingRight: 10 } 
        }}
      >
        <Tab.Screen name="Signup" component={Signup} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Soccer" component={Soccer} />
        <Tab.Screen name="Basketball" component={Basketball} />
        <Tab.Screen name="Racing" component={Motor} />
      </Tab.Navigator>
    </NavigationContainer>
    
    </Provider>
  );
}




