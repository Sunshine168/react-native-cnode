import  { HomeTabNavigator } from '../routers/tabRouter';
import { NavigationActions } from 'react-navigation'
const initialState = HomeTabNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home',
      }),
    ],
  }))
  
export const tabNavReducer = (state = initialState, action)=>{
     const nextState = HomeTabNavigator.router.getStateForAction(action,state);
     return  nextState || state;
}
