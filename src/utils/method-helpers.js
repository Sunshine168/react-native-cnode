import { NavigationActions } from 'react-navigation';
export const resetNavigationTo = (routeName: string, navigation: {}) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })],
  });

  navigation.dispatch(resetAction);
};


// const AuthHanlde = ()=>{
//
// }
