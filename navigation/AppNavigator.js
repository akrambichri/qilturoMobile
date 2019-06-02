import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import NavigationService from './NavigationService';
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import MainTabNavigator from './MainTabNavigator';
import LunchScreen from "../screens/LunchScreen"

import { Root } from "native-base";

const AuthStack = createStackNavigator({ SignIn: LoginScreen, Register:RegisterScreen });
const AppNavigator = createAppContainer(createSwitchNavigator(
  {
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth:AuthStack,
  Lunch:LunchScreen
  },
  {
    initialRouteName:"Lunch"
  }
));

export default () => <Root><AppNavigator  
                            ref={navigatorRef => {
                              NavigationService.setTopLevelNavigator(navigatorRef);
                            }}
                      /></Root>