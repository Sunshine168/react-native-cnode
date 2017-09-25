import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import{ loginIn } from '../../actions/user';
import { FormValidationMessage } from 'react-native-elements'
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
          navigation.navigate('Topics')
        }}
      />
)
  }
}
  constructor(props){
    super(props)
    this.state = {
      accesstoken:"",
      modalVisible:false,
    }
  }
  componentDidMount(){
      const { isLoginIn, navigation } = this.props;
      // if(isLoginIn){
      //   // resetNavigationTo('Home', navigation);
      //   navigation.navigate('Home')
      // }
      
  }
  componentWillReceiveProps(nextProps) {
    const { isLoginIn } = nextProps;
    if(isLoginIn){
      //  resetNavigationTo('Home', navigation);
      navigation.navigate('Home')
    }
  }
  loginIn = () =>{
    const { loginIn } = this.props;
    const { accesstoken } = this.state;
    if(accesstoken.trim() == 0){
      Alert.alert('提示','密码不能为空',[{text:'OK'}],
    {
      cancelable: false,
    })
    }else{
      loginIn(accesstoken)
    } 
    
  }
  render(){
     return (
         <KeyboardAwareScrollView
         style={{ backgroundColor: '#fff' }}
         resetScrollToCoords={{ x: 0, y: 0 }}
         contentContainerStyle={style.container}
         scrollEnabled={true}
         >
         <Image style={style.logo} source={require('../../assets/cnodejs.png')} />
         <Text style={style.label}>请输入 Access Token </Text>
         <TextInput
           style={style.accessInput}
           onChangeText={(text) => this.setState({accesstoken:text})}
         />
         {this.props.loginError ? <FormValidationMessage>{this.props.loginError}</FormValidationMessage>:null}
         <Button
           title={"点击登录"}
           onPress={this.loginIn}
         />
         <Button
           title={"扫码登录"}
           onPress={()=>{console.log("...")}}
         />
         </KeyboardAwareScrollView>   
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
  },
  logo:{
    width:300,
    height:100,
  },
  label:{
   fontSize:32,
   paddingTop:20,
  }
})

const mapStateToProps = (state)=>({
  isLoginIn:state.user.userInfo.success,
  loginError:state.user.loginError,
})
const mapDispatchToProps = (dispatch)=>({
   loginIn:(accesstoken)=>dispatch(loginIn(accesstoken))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
