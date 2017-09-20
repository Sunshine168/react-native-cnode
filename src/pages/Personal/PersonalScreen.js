import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
}from 'react-native';
import { TabHeaderBar } from '../../components/TabHeaderBar'
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default class PersonalScreen extends Component {

  render(){
    return (
      <View style={style.container}>
        <TabHeaderBar
          title={"个人设置"}
        />
        <View style={style.titleContainer}>
          <Text>
            个人设置
          </Text>
        </View>
      </View>
    )
  }
}
