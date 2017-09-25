import { 
  fetchTopics, 
  fetchTopicDetail, 
  postTopic, 
  collectTopic,
  cancelCollectTopic,
  postReply,
} from '../api/index';
import { 
  put, 
  select, 
  call, 
  take, 
  fork, 
  takeLatest, 
  takeEvery,
} from 'redux-saga/effects';
import { 
  GET_HOME_TOPICS, 
  GET_TOPIC_DETAIL, 
  POST_TOPIC, 
  COLLECT_TOPIC, 
  CANCEL_COLLECT_TOPIC,
} from '../actions/topic.type'
import {
  REPLY_TOPIC
}from '../actions/reply.type.js'
export const getTopics =  function* (params){
   try{
     const page = yield select(state=>state.topic.page)
     yield put({
       type:GET_HOME_TOPICS.PENDING
     })
     const processParams = {
       ...params,
       page,
     };
     const data = yield call(fetchTopics,processParams);
     if(data.success != 1){
       yield put({
         type: GET_HOME_TOPICS.ERROR,
         error:"数据源错误"
       })
     }else{
       let processData = data.data.map((item)=>{
         return {
           ...item,
           key:item.id
         }
       })
       yield put({
         type: GET_HOME_TOPICS.SUCCESS,
         payload: processData
       })
     }
   }catch(e){
     yield put({
       type: GET_HOME_TOPICS.ERROR,
       error:"内部错误"
     })
   }
}

export const getTopicDetail = function* (currentTopicDetailId){
  try{
    yield put({
      type:GET_TOPIC_DETAIL.PENDING
    });
    const  user = yield select(state=>state.user)
    let data;
    if(user.userInfo.success){
      //已经登录就附带token过去
      let { accesstoken } = user;
      data = yield call(fetchTopicDetail,currentTopicDetailId,accesstoken);
    }else{
      data = yield call(fetchTopicDetail,currentTopicDetailId);
    }
    if(data.success == 1){
       yield put({
         type: GET_TOPIC_DETAIL.SUCCESS,
         payload:data.data,
       })
    }else{
      yield put({
        type: GET_TOPIC_DETAIL.ERROR,
        error:"数据源错误"
      })
    }
  }
  catch(e){
    yield put({
      type: GET_TOPIC_DETAIL.ERROR,
      error:e
    })
  }
}

export const watchRequestTopics = function* (){
  while(true){
     const result = yield take(GET_HOME_TOPICS.REQUEST);
     yield fork(getTopics,result)
  }

}

/*
  尝试使用takeEvery的写法
  其实没有很大必要,在state中保存当前浏览的 currentTopicDetailId
  感觉最好还是使用上面的写法
 */
export const watchRequestTopic = function* (){
  //  yield* takeEvery(GET_TOPIC_DETAIL.REQUEST,getTopicDetail);
  while(true){
    const result = yield take(GET_TOPIC_DETAIL.REQUEST)
    yield fork(getTopicDetail,result.id)
  }
}


export const postTopicRequest = function* (params){
     try {
      const { accesstoken }= yield select(state => state.user);
      yield put({
        type:POST_TOPIC.PENDING  
      })
      
      const result = yield call(postTopic,{
          ...params,
          accesstoken,
      })
      if(result.success){
        yield put({
          type: POST_TOPIC.SUCCESS,    
        }) 
      }else{
        yield put({
          type: POST_TOPIC.ERROR,
          error:result.error_msg
        })
      }
     } catch (error) {
      yield put({
        type: POST_TOPIC.ERROR,
        error
      })
     }
     
}

export const postTopicWatcher = function* (){
  while(true){
    const  params = yield take(POST_TOPIC.REQUEST);
    yield fork(postTopicRequest,params)
  }
}


const collectTopicRequest  = function* ({topicId}){
     try{
         yield put({
           type:COLLECT_TOPIC.PENDING,
         })
         
         const user = yield select(state=>state.user);
         let result;
         if(user.userInfo.success){
            let accesstoken = user.accesstoken;
            result = yield call(collectTopic,topicId,accesstoken);
         }else{
           yield put({
             type:COLLECT_TOPIC.ERROR,
             error:"accesstoken为空",
           })
         }

         if(result.success){
          yield put({
            type:COLLECT_TOPIC.SUCCESS,
          })
         }else{
          yield put({
            type:COLLECT_TOPIC.ERROR,
            error:result.error_msg
          })
         }
     }catch(error){
      yield put({
        type:COLLECT_TOPIC.ERROR,
        error
      })
     }
}
const cancelCollectTopicRequest  = function* ({topicId}){
  try{
      yield put({
        type:COLLECT_TOPIC.PENDING,
      })
      const user = yield select(state=>state.user);
      let result;
      if(user.userInfo.success){
         let accesstoken = user.accesstoken;
         result = yield call(cancelCollectTopic,topicId,accesstoken);
      }else{
        yield put({
          type:COLLECT_TOPIC.ERROR,
          error:"accesstoken为空",
        })
      }
     
      if(result.success){
       yield put({
         type:COLLECT_TOPIC.SUCCESS,
       })
      }else{
       yield put({
         type:COLLECT_TOPIC.ERROR,
         error:result.error_msg
       })
      }
  }catch(error){
   yield put({
     type:COLLECT_TOPIC.ERROR,
     error
   })
  }
}


export const postReplyRequest = function* ({topicId,content,replyId}){
  try{
     yield put({
      type:REPLY_TOPIC.PENDING
     })
     const user = yield select(state=>state.user);
     let result;
     if(user.userInfo.success){
        let accesstoken = user.accesstoken;
        result = yield call(postReply,topicId,accesstoken,content,replyId);
     }else{
       yield put({
         type:REPLY_TOPIC.ERROR,
         error:"accesstoken为空",
       })
     }
     if(result.success){
      yield put({
        type:REPLY_TOPIC.SUCCESS,
      })
     }else{
      yield put({
        type:REPLY_TOPIC.ERROR,
        error:result.error_msg
      })
     }
  }catch(error){
    console.log(error)
    yield put({
      type:REPLY_TOPIC.ERROR,
      error
    })
  }
}
export const collectTopicWatcher = function* (){
    yield takeEvery(COLLECT_TOPIC.REQUEST,collectTopicRequest);
    
}

export const replyRequestWatcher = function* (){
  yield takeEvery(REPLY_TOPIC.REQUEST,postReplyRequest)
}


export const cancelCollectTopicWatcher = function* (){
  yield takeEvery(CANCEL_COLLECT_TOPIC.REQUEST,cancelCollectTopicRequest); 
}

