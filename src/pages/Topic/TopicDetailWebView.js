import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  WebView,
  Button
} from 'react-native';
import { getTopicDetail } from '../../actions/topic';
import { TopicLabel } from '../../components/TopicListItem';
import { connect } from 'react-redux';
import { MarkdownView } from 'react-native-markdown-view'
// import { URL } from '../../api/index'
const URL = "https://cnodejs.org"
class TopicDetailScreen extends Component {
  static navigationOptions = ({ navigation })=>{
  return {
    headerRight:(
      <Button
        title={"回帖"}
        onPress={()=>{console.log("")}}
      />
)
  }
}
  constructor(props){
    super(props)
    this.state = {
      url:""
    }
  }
injectJS = () => {
  const script = `
    var navBar = $('.navbar')[0];
        $(navBar).hide()
    `;
    if (this.webview) {
      this.webview.injectJavaScript(script);
    }
}
componentDidMount(){
   const { navigation,getTopicDetail } = this.props,
         { state } = navigation,
         { params } = state,
         { id } = params;
        //  getTopicDetail(id);
        let url = URL + `/topic/${id}`
        this.setState({
          url:url,
          scalesPageToFit:true,
        })
}
_getHeader(){
      let {
        good,
        top,
        tab,
        is_collect,
        author
      } = this.props.topic,
      topicLabelType = {
          good,
          tab,
          top
      };
    return (
      <View style={style.header}>
        <TopicLabel
          type={topicLabelType}
        />

        <TouchableOpacity>
          <View style={style.author}>
            <Image
              style={style.avatar}
              source={{uri:author.avatar_url}}
            />
            <Text>{author.loginname}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={
              is_collect ? style.collectLogo : style.collectedLogo
            }
            source={require('../../assets/collection.png')}
          />
        </TouchableOpacity>
      </View>
    )
    }
   _getFooter(){
    let {
      create_at,
      replies,
      visit_count
    } = this.props.topic;
    return (
      <View style={style.footer}>
        <Text style={style.createAt}>
          {create_at}
        </Text>
        <Text style={style.visitCount}>
          {visit_count}
        </Text>
      </View>
    )
   }
    render(){
      // const { topic, isPendingTopic } = this.props;
      // if(!topic){
      //   return (
      //
      //       <ActivityIndicator
      //         size = 'large'
      //       />
      //   )
      //
      // }
      // let {
      //   title,
      //   content,
      //   good,
      //   top,
      //   tab,
      //   visit_count,
      //   create_at,
      //   replies,
      //   author
      // } = topic;
      return (
        <View style={style.container}>
          {/* <View style={style.wrapper}>
            <View style={style.statusBar}></View>
            {this._getHeader()}
            <Text style={style.title}>{title}</Text>
            <ScrollView
              style={style.contentWrapper}
            >
              <Text style={style.content}>
            <MarkdownView>{content}</MarkdownView>
              </Text>
              {this._getFooter()}
            </ScrollView>
          </View> */}
          <WebView
            ref={webview => { this.webview = webview; }}
            source={{
              uri: this.state.url,
              method:"GET"
            }}
            startInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            style={style.contenWeb}
            onLoad={this.injectJS}
            scalesPageToFit={this.state.scalesPageToFit}
          />
        </View>
      )
    }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  },
  wrapper:{
    flex:1,
    flexDirection:"column",
  },
  header:{
    // flex:1,
    backgroundColor:"#EEE9E9",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:5,
    paddingBottom:5,
  },
  collectLogo:{
    width:30,
    height:30
  },
  collectedLogo:{
    tintColor:"#FFFF00",
  },
  author:{
    // flex:1,
    alignItems:"center",
    flexDirection:"row",
  },
  title:{
    // flex:1,
    fontSize:24,
    padding:10,
  },
  avatar:{
    width:30,
    height:30,
  },
  footer:{
    // flex:1
  },
  loading:{
    marginTop:200,
    alignItems:"center",
    justifyContent:"center",
  },
  statusBar:{
    marginTop:20,
  },
  contentWrapper:{
    paddingLeft:20,
    paddingRight:20,
  }
})

const mapStateToProps = (state)=>({
  topic:state.topic.topic,
  isPendingTopic:state.topic.isPendingTopic,
  currentTopicDetailId:state.topic.currentTopicDetailId,
})
const mapDispatchToProps = (dispatch)=>({
    getTopicDetail:(id)=>dispatch(getTopicDetail(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(TopicDetailScreen)
