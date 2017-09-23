import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
}from 'react-native';
import { connect } from 'react-redux';
import { TabHeaderBar } from '../../components/TabHeaderBar';
import { UnreadMessageItem, ReadedMessageItem } from '../../components/Message';
import { getMessages } from '../../actions/message'

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: '通知',
  }
  componentDidMount(){
      const { getMessages } = this.props;
      getMessages();
  }
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
  renderReadedMessageItem = (message) =>{
    const { navigation } = this.props;
     return (
     <ReadedMessageItem
        message={message.item}
        navigation={navigation}
     />)
  }
  renderUnReadMessageItem = (message) =>{
    const { navigation } = this.props;
    return (
      <UnReadMessageItem
         message={message.item}
         navigation={navigation}
      />)
  }
  render(){
    const { 
      hasnot_read_messages, has_read_messages 
    } = this.props;
    return (
      <View style={style.container}>
        <TabHeaderBar
          title={"通知中心"}
        />
         <View style={style.wrapper}>
         <View style={style.card}>
         <View style={style.labelContainer}>
         <Text style={style.label}>
          未读信息
        </Text>
         </View>
          <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={false}
          data={hasnot_read_messages}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderUnReadMessageItem}
        />
         </View>
         <View style={style.card}>
         <View style={style.labelContainer}>
         <Text style={style.label}>
          已读信息
        </Text>
         </View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={false}
          data={has_read_messages}
          extraData={this.state}
          keyExtractor={item=>item.id}
          renderItem={this.renderReadedMessageItem}
        />
         </View>
         </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    flexDirection:"column",
    paddingBottom:80,
  },
  wrapper:{
    marginTop:30,
    flex:1,
    paddingLeft:15,
    paddingRight:15,
    flexDirection:'column'
  },
  titleContainer:{
    flex:1,
    flexDirection:'column',
  },
  card:{
    // flex:1,
    marginBottom:10,
  },
  labelContainer:{
    backgroundColor:"#f4f4f4",
    paddingTop:10,
    paddingBottom:10,
  }
})

const mapStateToProps = (state)=>({
  user:state.user,
  currentRouteName:state.tabNav.routeName,
  has_read_messages:state.message.has_read_messages,
  hasnot_read_messages:state.hasnot_read_messages,
})

const mapDispatchToProps = (dispatch) => ({
  getMessages:() => dispatch(getMessages())
})

export default connect(mapStateToProps,mapDispatchToProps)(NotificationsScreen);
