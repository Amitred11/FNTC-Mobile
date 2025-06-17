import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen2 from './screens/SplashScreen2';
import GetStartedScreen from './screens/GetStartedScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash2">
        <Stack.Screen name="Splash2" component={SplashScreen2} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
