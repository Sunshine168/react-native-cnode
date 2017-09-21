import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
}from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { TabHeaderBar } from '../../components/TabHeaderBar';
import { getPersonalUserInfo } from '../../actions/user';
import { connect } from 'react-redux';
import moment from 'moment';
const LIST_DATA = [{
  leftIcon:{
    name:"",
    type:"",
    color:"",
  },
  title:"github",
  rightTitle:""
}]
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    flexDirection:'column'
  },
  wrapper:{
    flex:1,
 
  },
  userAvatarContainer:{
    paddingTop:15,
    paddingBottom:15,
    
  },
  topItem:{
    borderTopWidth:1,
    borderTopColor:"#cbd2d9"
  },
  card:{
    marginTop:50,
  },
  controls:{
    marginTop:30,
  }
})

class PersonalScreen extends Component {
  static navigationOptions = {
    title: '个人',
  }
   componentDidMount(){
     const { getPersonalUserInfo } = this.props;
     getPersonalUserInfo();
   }
  render(){
    const { personalUserInfoDetail } = this.props;
    return (
      <View style={style.container}>
        <TabHeaderBar
          title={"个人设置"}
        />
        <View style={style.wrapper}>
        <ListItem
          containerStyle={style.userAvatarContainer}
          roundAvatar
           avatar={{uri:personalUserInfoDetail.avatar_url}}
            key={0}
            title={personalUserInfoDetail.loginname}
            hideChevron={true}
            rightTitle={"注册于-" + moment(personalUserInfoDetail.create_at).format('YYYY年MM月DD日')}
      />
      <View style={style.card}>
      <ListItem
          containerStyle={style.topItem}
          roundAvatar
          leftIcon={{
              type:"font-awesome",
              name:"github"
           }}
            key={1}
            title={"github"}
            hideChevron={true}
            rightTitle={personalUserInfoDetail.githubUsername}
      />
      <ListItem
          containerStyle={style.normal}
          roundAvatar
          leftIcon={{
              type:"font-awesome",
              name:"money"
           }}
            key={2}
            title={"论坛积分"}
            hideChevron={true}
            rightTitle={personalUserInfoDetail.score+""}
      />
      <ListItem
          containerStyle={style.normal}
          roundAvatar
          leftIcon={{
              type:"font-awesome",
              name:"pencil"
           }}
            key={3}
            title={"最近主题"}
            hideChevron={true}
            rightTitle={personalUserInfoDetail.recent_topics.length+""}
      />
      <ListItem
          containerStyle={style.normal}
          roundAvatar
          leftIcon={{
              type:"font-awesome",
              name:"reply"
           }}
            key={4}
            title={"最近回复"}
            hideChevron={true}
            rightTitle={personalUserInfoDetail.recent_replies.length+""}
      />
      </View>
      <View style={style.controls}>
      <Button
  backgroundColor={"#FA8072"}
  icon={{name: 'envira', type: 'font-awesome'}}
  title='注销' 
  />
      </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps =  (state) => ({
  personalUserInfoDetail:state.user.personalUserInfoDetail,
})

const mapDispatchToProps = (dispatch)=>({
   getPersonalUserInfo:()=>dispatch(getPersonalUserInfo())
})

export default connect(mapStateToProps,mapDispatchToProps)(PersonalScreen)