import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Cnode } from './routes';
import { Provider } from 'react-redux';
import { configureStore } from './store';
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

class App extends Component {

   render(){
      return(
        <Provider store={configureStore}>
          <Cnode/>
        </Provider>
      )
   }
}


AppRegistry.registerComponent('cnode_project', () => App);
