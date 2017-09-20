import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
}from 'react-native';
import { TabHeaderBar } from '../../components/TabHeaderBar';
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    flex:"column",
  },
  textContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default class NotificationsScreen extends Component {
  render(){
    return (
      <View style={style.container}>
        <TabHeaderBar
          title={"通知中心"}
        />
        <View style={style.textContainer}>
          <Text>
            NoticeScreen
          </Text>
        </View>
      </View>
    )
  }
}
