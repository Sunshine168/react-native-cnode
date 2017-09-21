import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  AsyncStorage
} from 'react-native';
import { persistStore } from 'redux-persist';
import { StackNavigator } from 'react-navigation';
import { Cnode } from './routes';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import rootSaga from './src/saga/index';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
const store = configureStore;
store.runSaga(rootSaga)
const CnodeContianer = (props)=>{
  return (
    <Cnode 
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.nav,
    })}
   />
  )
}
const mapStateToProps = (state)=>({
  nav:state.nav
})
const CnodeWithNavigationState = connect(mapStateToProps)(CnodeContianer);
class App extends Component {
   componentWillMount() {
     persistStore(
       store,
       { storage: AsyncStorage,blacklist: ['topic']},
       () => {
           this.setState({ rehydrated: true });
       });
   }
   render(){
      return(
        <Provider store={store}>
          <CnodeWithNavigationState/>
        </Provider>
      )
   }
}

AppRegistry.registerComponent('cnode_project', () => App);
