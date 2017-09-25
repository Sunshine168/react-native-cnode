import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  WebView,
  Button,
  TextInput,
  Alert
} from 'react-native';
import {getTopicDetail, collectTopic, cancelCollectTopic} from '../../actions/topic';
import {postReply} from '../../actions/reply';
import {TopicLabel} from '../../components/TopicListItem';
import {connect} from 'react-redux';
import {MarkdownView} from 'react-native-markdown-view';
import {FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Display from 'react-native-display';
const URL = "https://cnodejs.org"
class TopicDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {}
  }
  constructor(props) {
    super(props)
    this.state = {
      url: "",
      isReplying: false,
      replyContent: "",
      isIgnoreSuccessTips: true
    }
  }
  _reload = () => {
    this
      .webview
      .reload();
  }
  _injectJS = () => {
    const script = `
    var navBar = $('.navbar')[0];
        $(navBar).hide()
    `;
    if (this.webview) {
      this
        .webview
        .injectJavaScript(script);
    }
  }

  componentDidMount() {
    console.log(this.props)
    const {navigation, getTopicDetail} = this.props, {state} = navigation, {params} = state, {id} = params;
    //  getTopicDetail(id);
    let url = URL + `/topic/${id}`
    this.setState({url: url, scalesPageToFit: true, isCollectSuccess: false})
    getTopicDetail(id);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const {isReplySuccess} = nextProps, {isIgnoreSuccessTips} = this.state;
    //避免重复接受
    if (!isIgnoreSuccessTips) {
      //totast
      if (isReplySuccess) {
        Alert.alert('提示', '发帖成功', [
          {
            text: 'OK'
          }
        ])
        //接受成功后
        this.setState({isIgnoreSuccessTips: true, replyContent: ""})
      } else {
        Alert.alert('提示', '发帖失败', [
          {
            text: 'OK'
          }
        ])
      }

    }
  }
  _setReplying = () => {
    this.setState({
      isReplying: !this.state.isReplying
    }, () => {
      this
        .replyInput
        .focus();
    })

  }
  _replyTopicRequest = () => {
    const {replyContent} = this.state,
      topicId = this.props.topic.id, {isLogin, navigation} = this.props;
    if (!isLogin) {
      navigation.navigate('Login')
      return;
    }
    this
      .props
      .postReply(topicId, replyContent)
    this.setState({isIgnoreSuccessTips: false})
  }
  _getHeader() {
    let {good, top, tab, is_collect, author} = this.props.topic,
      topicLabelType = {
        good,
        tab,
        top
      };
    return (
      <View style={style.header}>
        <TopicLabel type={topicLabelType}/>

        <TouchableOpacity>
          <View style={style.author}>
            <Image
              style={style.avatar}
              source={{
              uri: author.avatar_url
            }}/>
            <Text>{author.loginname}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
    )
  }
  _getFooter() {
    let {create_at, replies, visit_count} = this.props.topic;
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
  _collectTopic = () => {
    const {isLogin, navigation} = this.props, {state} = navigation, {params} = state, {id} = params;
    if (!isLogin) {
      navigation.navigate('Login')
      return;
    } else {
      this
        .props
        .collectTopic(id)
    }
    this.setState({isCollectSuccess: true})
  }
  _cancelCollectTopic = () => {
    const {isLogin, navigation} = this.props, {state} = navigation, {params} = state, {id} = params;
    if (!isLogin) {
      navigation.navigate('Login')
      return;
    } else {
      this
        .props
        .cancelCollectTopic(id)
    }
    this.setState({isCollectSuccess: false})
  }
  render() {
    const {isReplying} = this.state, {topic, isPendingReply} = this.props;
    return (
      <KeyboardAwareScrollView
        style={{
        backgroundColor: '#fff'
      }}
        resetScrollToCoords={{
        x: 0,
        y: 0
      }}
        contentContainerStyle={style.container}
        scrollEnabled={true}>
        <WebView
          ref={webview => {
          this.webview = webview;
        }}
          source={{
          uri: this.state.url,
          method: "GET"
        }}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={style.contenWeb}
          onLoad={this._injectJS}
          scalesPageToFit={this.state.scalesPageToFit}/>
        <Display enable={!this.state.isReplying}>

          <View style={style.controlGroup}>
            {topic && topic.is_collect || this.state.isCollectSuccess
              ? <TouchableOpacity
                style={style.iconContainer}
                onPress={this._cancelCollectTopic}>
                <Icon name='star' type='font-awesome' color='#FF6347' size={32}/>
              </TouchableOpacity>
              :
              <TouchableOpacity style={style.iconContainer} onPress={this._collectTopic}>
                <Icon name='star-o' type='font-awesome' color='#BEBEBE' size={32}/>
              </TouchableOpacity>}
            <TouchableOpacity style={style.iconContainer} onPress={this._setReplying}>
              <Icon
                name='message-outline'
                type='material-community'
                color='#BEBEBE'
                size={32}
                iconStyle={style.iconContainer}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.reloadContainer} onPress={this._reload}>
              <Icon name='refresh' type='material-community' color='#1771fb' size={32}/>
            </TouchableOpacity>
          </View>
        </Display>
        <Display enable={this.state.isReplying}>
          <View style={style.controlGroup}>

            <View style={style.replyFrom}>
              <FormInput
                value={this.state.replyContent}
                onChangeText={text => this.setState({replyContent: text})}
                ref={input => this.replyInput = input}/>
            </View>
            <Button disabled={isPendingReply} title='回帖' onPress={this._replyTopicRequest}/>
            <Button
              title='取消'
              onPress={() => {
              this.setState({isReplying: false})
            }}/>
          </View>
        </Display>
      </KeyboardAwareScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  wrapper: {
    flex: 1
  },
  header: {
    // flex:1,
    backgroundColor: "#EEE9E9",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5
  },
  collectLogo: {
    width: 30,
    height: 30
  },
  collectedLogo: {
    tintColor: "#FFFF00"
  },
  author: {
    // flex:1,
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    // flex:1,
    fontSize: 24,
    padding: 10
  },
  avatar: {
    width: 30,
    height: 30
  },
  footer: {
    // flex:1
  },
  loading: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  statusBar: {
    marginTop: 20
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  replyFrom: {
    flex: 1,
    height: 40
  },
  controlGroup: {
    position: "relative",
    padding: 10,
    flexDirection: 'row',
    justifyContent: "flex-start"
  },
  iconContainer: {
    marginLeft: 10
  },
  reloadContainer: {
    position: "absolute",
    top: 10,
    right: 10
  },
  hiddenGroup: {
    height: 0
  }
})

const mapStateToProps = (state) => ({
  topic: state.topic.topic,
  isPendingTopic: state.topic.isPendingTopic,
  currentTopicDetailId: state.topic.currentTopicDetailId,
  isReplySuccess: state.reply.isReplySuccess,
  isPendingReply: state.reply.isPendingReply,
  isLogin: state.user.userInfo.success
})
const mapDispatchToProps = (dispatch) => ({
  getTopicDetail: (id) => dispatch(getTopicDetail(id)),
  collectTopic: (id) => dispatch(collectTopic(id)),
  cancelCollectTopic: (id) => dispatch(cancelCollectTopic(id)),
  postReply: (topicId, content) => dispatch(postReply({topicId, content}))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetailScreen)
