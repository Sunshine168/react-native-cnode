import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';


export default class LoginScreen extends Component {


  static navigationOptions = ({ navigation })=>{
  return {
    title:"登录界面",
    headerRight:(
      <Button
        title={"扫码登录"}
        onPress={()=>{console.log("")}}
      />
)
  }
}
  render(){
     return (
       <View style={style.container}>
         <Text>请输入 Access Token </Text>
         <Button>登录</Button>
       </View>
     )
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  }
})
