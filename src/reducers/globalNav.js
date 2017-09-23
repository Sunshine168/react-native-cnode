import { Cnode } from '../routers/globalRouter';
const initialState = Cnode.router.getStateForAction(Cnode.router.getActionForPathAndParams('Home'));
console.log(initialState)
export const globalReducer = (state = initialState,action)=>{
    const nextState = Cnode.router.getStateForAction(action,state);
    // console.log(action)
    // console.log(state)
    // console.log(nextState)
    // switch(action.type){
    //      case "Navigation/NAVIGATE":
    //      return {
    //          ...nextState,
    //          routes:[nextState.routes[nextState.routes.length - 1],...state.routes]
    //      }
    //      default:
    //      return  nextState || state;
    //  }
    return nextState || state;
}