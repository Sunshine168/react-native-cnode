import React, {Component} from 'react';
import {View, Text, StyleSheet,Picker} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import { TabHeaderBar } from '../../components/TabHeaderBar';
import { Button } from 'react-native-elements';
import { postTopicRequest } from '../../actions/topic';
import { connect } from 'react-redux'; 
import Toast from 'react-native-root-toast';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'column'
  },
  TestTitle: {},
  fromContainer: {
    flex: 1
  },
  control:{
    marginTop:50,
  }
})

 class TopicPostScreen extends Component {
  static navigationOptions = {
    title: '发帖'
  }
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      titleValidationMessage: "",
      contentValidationMessage: "",
      tab:"dev",
      toastVisible:false,
    }
  }
  componentWillReceiveProps = (nextProps) => {
      const { isPostTopicSuccess } = nextProps;
      console.log(isPostTopicSuccess)
      if( isPostTopicSuccess ){
        this.setState({
          toastVisible:true,
        })
        console.log(isPostTopicSuccess)
      }
  }
  
  _postTopic = () =>{
 
     const {
       title,
       content,
       tab,
     } = this.state;
     const {
      postTopicRequest
     } = this.props;
     if(title.trim().length == 0){
        this.setState({
          titleValidationMessage:"标题不能为空"
        })
     }else{
       this.setState({
        titleValidationMessage:""
       })
     }
     if(content.trim().length == 0){
          this.setState({
            contentValidationMessage:"内容不能为空",
          })
     }else{
        this.setState({
          contentValidationMessage:""
        })
     }
     postTopicRequest({
      title,
      content,
      tab,
     })
  }
  render() {
    const {
      titleValidationMessage,
      contentValidationMessage
    }  = this.state;
    return (
      <View style={style.container}>
        <TabHeaderBar title={"发帖"}/>
        <View style={style.fromContainer}>
          <FormLabel>标题</FormLabel>
          <FormInput 
          inputStyle={{
            fontSize:20,
          }}
          onChangeText={(text) => this.setState({title: text})}
          placeholde = {"请输入标题"}
          />
          {titleValidationMessage 
            ? <FormValidationMessage>{titleValidationMessage}</FormValidationMessage>
            : null
}
          <FormLabel>内容</FormLabel>
          <FormInput 
          inputStyle={{
            fontSize:18,
            height:100,
          }}
          onChangeText={(text) => this.setState({content: text
          })}
          multiline = {true}
          placeholde = {"请输入内容"}
          /> 
          {contentValidationMessage
            ? <FormValidationMessage>{contentValidationMessage}</FormValidationMessage>
            : null
} 
<FormLabel>帖子类型</FormLabel>     
<Picker
  selectedValue={this.state.tab}
  onValueChange={(tab) => this.setState({tab})}>
  <Picker.Item label="测试" value="dev" />
  <Picker.Item label="问答" value="ask" />
  <Picker.Item label="分享" value="share" />
</Picker>  
      <View style={style.control}>
      <Button
      icon={{name: 'squirrel', type: 'octicon'}}
      title='OCTICON' 
      onPress = {this._postTopic}
      />
        </View>
        </View>
        <Toast
            visible={this.state.toastVisible}
            position={20}
            shadow={false}
            animation={false}
            hideOnPress={true}
        >发帖成功</Toast>
      </View>
    )
  }
}


const mapDispatchToProps = (dispatch) =>({
  postTopicRequest:(params)=>dispatch(postTopicRequest(params))
})
const mapStateToProps = (state)=>({
  isLogin:state.user.userInfo.success,
  isPostTopicSuccess:state.topic.isPostTopicSuccess,
})
export default connect(mapStateToProps,mapDispatchToProps)(TopicPostScreen)