import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginView from './src/components/Login';
import SearchView from './src/components/Search';
import ResultView from './src/components/Result';

// Navigation to direct users to each page
const MainNavigator = createStackNavigator({
  LoginView: {screen: LoginView},
  SearchView: {screen: SearchView},
  ResultView: {screen: ResultView},
});

const App = createAppContainer(MainNavigator);
export default App;