import React from 'react'
import { StackNavigator } from 'react-navigation';

import TopicScreen from './src/pages/Topic'
import WelcomeScreen from './src/pages/Welcome'

export const Cnode  = StackNavigator({
   welcome:{
     screen:WelcomeScreen,
     navigationOptions: {
       header: null,
     },
   },
   Topic:{
     screen:TopicScreen,
   }
})

const MainNavigator = StackNavigator({
  Topic:{
    screen:TopicScreen,
    headerMode: 'screen',
  }
})

// const HomeTabNavigator = TabNavigator({
//
// })
