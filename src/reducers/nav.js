import { HomeTabNavigator } from '../../routes';
const initialState = HomeTabNavigator.router.getStateForAction(HomeTabNavigator.router.getActionForPathAndParams('Topic'));


export const tabNavReducer = (state = {
    ...initialState,
    currentRouteName:"Topic"
}, action)=>{
     const nextState = HomeTabNavigator.router.getStateForAction(action,state);
     switch(action.type){
         case "Navigation/NAVIGATE":
         return {
             ...nextState,
             currentRouteName:action.routeName
         }
         default:
         return  nextState || state;
     }
     return  nextState || state;
}
