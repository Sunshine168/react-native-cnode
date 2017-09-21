import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    Text,
    Button,
    StyleSheet
 } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';


class Message extends Component  {
    _toTopicDetail= ()=>{
       const { navigation, topic } = this.props
       navigation.navigate('TopicDetail',{
        id:topic.id,
      })   
    }
    render(){
        const { 
            type,
            author,
            topic,
            id
      } = this.props.message;
      let subtitle = "";
        if(type == 'reply'){
            subtitle = "回复了你";
        }
        if(type == 'at'){
            subtitle = "@了你"
        }
        return (
           <TouchableOpacity>
          <ListItem
            roundAvatar
            key={id}
            title={topic.title}
            subtitle={subtitle}
            avatar={{uri:author.avatar_url}}
          />
           </TouchableOpacity>
           )
    }
}


export const  UnreadMessageItem = (props)=>{
   const  messageItem = props.message; 
        return (
            <View style={style.container}>
               <Message
                 message={messageItem}
               />
               <Button
                title={"点击标记阅读"}
                onPress={()=>{
                }}
               />
            </View>
        )
}

export const  ReadedMessageItem = (props)=>{
    const  messageItem = props.message; 
         return (
             <View style={style.container}>
                <Message
                message={messageItem}
                />
             </View>
         )
 }


const style = StyleSheet.create({
    messageContainer:{
        flex:1
    },
    wrapper:{
        flex:1,
    }
})



