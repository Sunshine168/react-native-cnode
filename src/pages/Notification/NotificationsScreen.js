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

class NotificationsScreen extends Component {
  componentWillReceiveProps(nextProps){
    const { user, currentRouteName } = nextProps;
    if(currentRouteName == 'Notification'){
      if(!user.userInfo){
        console.log("unlogin")
     }else{
       console.log("login")
     }
    }
  }
  render(){
    const { user, navigation } = this.props;
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
  currentRouteName:state.tabNav.currentRouteName,
})

export default connect(mapStateToProps)(NotificationsScreen);
