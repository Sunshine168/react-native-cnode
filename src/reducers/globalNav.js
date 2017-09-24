import { Cnode } from '../routers/globalRouter';
const initialState = Cnode.router.getStateForAction(Cnode.router.getActionForPathAndParams('Welcome'));
export const globalReducer = (state = initialState,action)=>{
    const nextState = Cnode.router.getStateForAction(action,state);
    return nextState || state;
}