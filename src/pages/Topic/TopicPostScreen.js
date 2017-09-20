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
    flexDirection:'column'
  },
  TestTitle:{

  }
})

export default class TopicPostScreen extends Component {
  render(){
    return (
      <View style={style.container}>
        <TabHeaderBar
          title={"发帖"}
        />
        <Text>
          TopicPostScreen
        </Text>
      </View>
    )
  }
}
