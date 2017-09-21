import React, { Component } from 'react'
import{
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
}from 'react-native'
import { convertDateBetweenNow } from '../utils/date-helpers'
import moment from 'moment'
const TopicLabelContext = {
  good:{text:"精华",backgroundColor:"#FF0000"},
  top:{text:"顶置",backgroundColor:"#FF4500"},
  share:{text:"分享",backgroundColor:"#00BFFF"},
  ask:{text:"问答",backgroundColor:"#00CED1"},
  job:{text:"招聘",backgroundColor:"#00EE76"},
  dev:{text:"测试",backgroundColor:"#FF6A6A"},
  default:{text:"默认",backgroundColor:"#7B68EE"},
}
const Deaful_Tab = 'default';
export const TopicLabel = ( { type } )=>{
    let { good,top,tab } = type,
        topicLabelContext,
        realTab;
    //优先返回精华便签
    if(good){
       topicLabelContext = TopicLabelContext['good'];
    }else{
      //返回顶置内容
      if(top){
       topicLabelContext = TopicLabelContext['top'];
      }else{
       //返回普通内容
       if(tab){
          realTab = tab
       }else{
         realTab = Deaful_Tab;
       }
       topicLabelContext = TopicLabelContext[realTab];
      }
    }
    return (
      <View style={{
          backgroundColor:topicLabelContext['backgroundColor'],
          padding:10,
      }}>
        <Text style={style.topicLabel}>
          {topicLabelContext['text']}
        </Text>
      </View>
    )
}

export const TopicListItem = ({topic,navigation})=>{
     let topicItem = topic.item,
      { good,tab,top } = topicItem,
       topicLabelType = {
           good,
           tab,
           top
       };
   return (
    <TouchableOpacity onPress = {()=>{
      navigation.navigate('TopicDetail',{
        id:topicItem.id,
      })
    }}>
      <View style={style.container}>
        <View style={style.wrapper}>
          <View style={style.topic}>
            <Text
              numberOfLines={1}
              style={style.title}
            >
              {topicItem.title}
            </Text>
            <View style={style.topicDetail}>
              <TopicLabel
                type={topicLabelType}
              />
              <Text style={style.time}>
                发帖 - {moment(topicItem.create_at).startOf('minute').fromNow()}
              </Text>
              <Text style={style.time}>
                最后回复 - {moment(topicItem.last_reply_at).startOf('minute').fromNow()}
              </Text>
            </View>
          </View>
          <View style={style.author}>
            <TouchableOpacity>
              <Image
                style={style.avatar}
                source={{uri:topicItem.author.avatar_url}}
              />
            </TouchableOpacity>
            <Text>{topicItem.author.loginname}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
   )
}


const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  },
  wrapper:{
      paddingTop:10,
      paddingBottom:10,
      flexDirection: 'row',
      flex:1,
  },
  topic:{
     flexDirection:'column',
     flex:3,
  },
  title:{
    fontSize:18
  },
  topicDetail:{
    flexDirection:'row',
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
  },
  author:{
    marginLeft:10,
    alignItems:"center",
    flex:1
  },
  avatar:{
    width:30,
    height:30,
  },
  time:{
    fontSize:12,
  },
  topicLabel:{
    color:"#fff"
  }
})
