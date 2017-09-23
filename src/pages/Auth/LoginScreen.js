import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import{ loginIn } from '../../actions/user';

const { width } = Dimensions.get('window')
import { resetNavigationTo } from '../../utils/method-helpers'
class LoginScreen extends Component {


  static navigationOptions = ({ navigation })=>{
  return {
    title:"登录界面",
    headerRight:(
      <Button
        title={"暂不登录"}
        onPress={()=>{
          navigation.navigate('Home')
        }}
      />
)
  }
}
  constructor(props){
    super(props)
    this.state = {
      accesstoken:"",
    }
  }
  componentDidMount(){
      const { user, navigation } = this.props;
      if(user.userInfo.success){
        // resetNavigationTo('Home', navigation);
        navigation.navigate('Home')
      }
  }
  loginIn = () =>{
    const { loginIn } = this.props;
    const { accesstoken } = this.state;
    loginIn(accesstoken)
  }
  render(){
     return (
       <View style={style.container}>
         <Text>请输入 Access Token </Text>
         <TextInput
           style={style.accessInput}
           onChangeText={(text) => this.setState({accesstoken:text})}
         />
         <Button
           title={"点击登录"}
           onPress={this.loginIn}
         />
         <Button
           title={"扫码登录"}
           onPress={()=>{console.log("...")}}
         />
       </View>
     )
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  accessInput:{
    width:width,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})

const mapStateToProps = (state)=>({
  user:state.user
})
const mapDispatchToProps = (dispatch)=>({
   loginIn:(accesstoken)=>dispatch(loginIn(accesstoken))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
