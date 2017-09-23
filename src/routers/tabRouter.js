import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';
import TopicsScreen  from '../pages/Topic/TopicsScreen';
import NotificationsScreen from '../pages/Notification/NotificationsScreen';
import PersonalScreen from '../pages/Personal/PersonalScreen';
import TopicPostScreen from '../pages/Topic/TopicPostScreen';
import { Icon } from 'react-native-elements';
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
  export default HomeTabNavigatorWithState;


