import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
}from 'react-native';
import { connect } from 'react-redux';
import { TabHeaderBar } from '../../components/TabHeaderBar';
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    flexDirection:"column"
  },
  titleContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default class NotificationsScreen extends Component {
  render(){
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <TabHeaderBar
          title={"通知中心"}
        />
        <View style={style.titleContainer}>
          <Text>
            NoticeScreen
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state)=>({
  user:state.user,
})