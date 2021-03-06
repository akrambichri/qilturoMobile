import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import categoriesScreen from '../screens/CategoriesScreen';
import ArticlesScreen from "../screens/ArticlesScreen"
import LibraryScreen from '../screens/LibraryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ArticleViewScreen from "../screens/ArticleViewScreen"
import ReadingScreen from "../screens/ReadingScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ExploreScreen from "../screens/ExploreScreen"
import RatingScreen from '../screens/RatingScreen';
import CGScreen from '../screens/CGScreen';
import LanguesScreen from '../screens/LanguesScreen';
import NotesScreen from '../screens/NotesScreen';
import SubscriptionScreen from "../screens/SubscriptionScreen"

const HomeStack = createStackNavigator({
  Home: ExploreScreen,
  
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-compass'
          : 'md-compass'
      }
    />
  ),
};

const CategoriesStack = createStackNavigator({
  Categories: categoriesScreen,
  Articles:ArticlesScreen,
  Article:ArticleViewScreen,
  Reading:ReadingScreen,
  Rating:RatingScreen,
});

CategoriesStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  return { 
    tabBarVisible:routeName !== "Reading" && routeName !== "Rating", 
    tabBarLabel: 'Categories',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        type="Entypo"
        name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
      />
    ),
  }
};



const LibraryStack = createStackNavigator({
  Library: LibraryScreen,
  Notes:NotesScreen,
});

LibraryStack.navigationOptions = {
  tabBarLabel: 'Library',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen,
  CG:CGScreen,
  Langues:LanguesScreen,
  Subscription:SubscriptionScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CategoriesStack,
  LibraryStack,
  SettingsStack,
},
 {
  tabBarOptions :  {
    activeBackgroundColor :"#043578",
    inactiveBackgroundColor :"#043578",
    activeTintColor :"rgba(255,255,255,1)",
    inactiveTintColor :"rgba(255,255,255,0.5)"
  }
 }
);
