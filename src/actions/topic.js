//action type
import{
  GET_HOME_TOPICS,
  GET_TOPIC_DETAIL,
  POST_TOPIC,
  POST_REPLY,
  COLLECT_TOPIC,
  CANCEL_COLLECT_TOPIC,
}from './topic.type'

//action
export const getTopics = (params) => {
  return {
    type:GET_HOME_TOPICS.REQUEST,
    ...params,
  }
}


export const getTopicDetail = (id)=>({
    type:GET_TOPIC_DETAIL.REQUEST,
    id:id
  })


  export const postTopicRequest = (params)=>({
    type:POST_TOPIC.REQUEST,
    ...params
  })
  

  export const postReply = (params)=>({
    type:POST_REPLY.REQUEST,
    ...params
  })

  export const collectTopic = (topicId)=>({
    type: COLLECT_TOPIC.REQUEST,
    topicId
  })

  export const cancelCollectTopic = (topicId)=>({
    type: CANCEL_COLLECT_TOPIC.REQUEST,
    topicId
  })