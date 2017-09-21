import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import TopicsScreen  from './src/pages/Topic/TopicsScreen';
import WelcomeScreen from './src/pages/Welcome';
import TopicDetailScreen from './src/pages/Topic/TopicDetailWebView';
import TopicPostScreen from './src/pages/Topic/TopicPostScreen';
import NotificationsScreen from './src/pages/Notification/NotificationsScreen';
import PersonalScreen from './src/pages/Personal/PersonalScreen';
import { Icon } from 'react-native-elements';
import LoginScreen  from './src/pages/Auth/LoginScreen'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';



export const HomeTabNavigator = TabNavigator({
  Topic:{
     screen:TopicsScreen,
     navigationOptions: {
       tabBarIcon: ({ tintColor }) =>
         <Icon
           containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
           color={tintColor}
           name="home"
           size={33}
         />,
     },
  },
  TopicPost:{
    screen:TopicPostScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          color={tintColor}
          name="edit"
          size={33}
        />,
    },
  },
  Notification:{
    screen:NotificationsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          color={tintColor}
          type="Zocial"
          name="email"
          size={33}
        />,
    },
  },
  Personal:{
    screen:PersonalScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          color={tintColor}
          type="Octicons"
          name="settings"
          size={33}
        />,
    },
  }
})
const HomeTabNavigatorContainer = (props)=>{
  console.log()
  return <HomeTabNavigator
      navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.tabNav,
    })}   
  />
}
const mapStateToProps = ({ tabNav })=>{
  return {
    tabNav:tabNav
  }
}

const HomeTabNavigatorWithState = connect(mapStateToProps)(HomeTabNavigatorContainer)


//main routes
export const Cnode  = StackNavigator({
   Welcome:{
     screen:WelcomeScreen,
     navigationOptions: {
       header: null,
     },
   },
   Login:{
     screen:LoginScreen,
   },
   Home:{
     screen:HomeTabNavigatorWithState,
     navigationOptions: {
       header: null,
     },
   },
   TopicDetail:{
     screen:TopicDetailScreen,
   },
},
{
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
}
)
