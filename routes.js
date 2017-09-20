import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';

import TopicsScreen  from './src/pages/Topic/TopicsScreen'
import WelcomeScreen from './src/pages/Welcome'
import TopicDetailScreen from './src/pages/Topic/TopicDetailWebView'

console.log(TopicsScreen)
export const Cnode  = StackNavigator({
   welcome:{
     screen:WelcomeScreen,
     navigationOptions: {
       header: null,
     },
   },
   Topic:{
     screen:TopicsScreen,
   },
   TopicDetailScreen:{
     screen:TopicDetailScreen,
   }
})

// const MainNavigator = StackNavigator({
//   Topic:{
//     screen:TopicsScreen,
//     headerMode: 'screen',
//   }
// })

const HomeTabNavigator = TabNavigator({
  Topic:{
     screen:TopicsScreen,
  }
})
