import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeTabNavigatorWithState, { HomeTabNavigator } from './tabRouter';
import WelcomeScreen from '../pages/Welcome';
import TopicDetailScreen from '../pages/Topic/TopicDetailWebView';
import { Icon } from 'react-native-elements';
import LoginScreen  from '../pages/Auth/LoginScreen'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';



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

const CnodeStackNavigatorContainer = (props) => {
  return <Cnode
      navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.globalNav,
      })}
      screenProps={{ rootNavigation: props.navigation }}
    />
}

const mapStateToProps = ({globalNav}) => ({
    globalNav
  })
  
const CnodeStackNavigatorWithState = connect(mapStateToProps)(Cnode);

export default CnodeStackNavigatorWithState;