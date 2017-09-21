import { Cnode } from '../../routes';
const initialState = Cnode.router.getStateForAction(Cnode.router.getActionForPathAndParams('Login'));

console.log(initialState)
export const navReducer = (state = initialState, action)=>{
    const nextState = Cnode.router.getStateForAction(action,state);
    return nextState || state;
}
