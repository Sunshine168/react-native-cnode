import  { HomeTabNavigator } from '../routers/tabRouter';
import { NavigationActions } from 'react-navigation'
const initialState = HomeTabNavigator.router.getStateForAction(HomeTabNavigator.router.getActionForPathAndParams('Topic'));
  
export const tabNavReducer = (state = initialState, action)=>{
     const nextState = HomeTabNavigator.router.getStateForAction(action,state);
     return  nextState || state;
}
