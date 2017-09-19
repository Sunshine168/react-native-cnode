//action type
import{
  GET_HOME_TOPICS,
  ADD_TOPICS_PAGE
}from './topic.type'


import {
  fetchTopics
}from '../api/index'


//action
export const getTopics = (params) =>{
  return (dispatch,getState)=>{
    dispatch( {type:GET_HOME_TOPICS.PENDING });
    let page = getState().topic.page;
    return fetchTopics({
      ...params,
      page,
    })
       .then(data=>{
          if(data.success){
            let processData = data.data.map((item)=>{
              return {
                ...item,
                key:item.id
              }
            })
            dispatch({
              type: GET_HOME_TOPICS.SUCCESS,
              payload: processData
            })
          }else{
            dispatch({
              type: GET_HOME_TOPICS.ERROR,
              error:"time out ?"
            })
          }
       })
       .catch(error=>{
         dispatch({
           type: GET_HOME_TOPICS.ERROR,
           payload:error,
         });
       });
  };
};

export const addPage = ()=>{
  return {type:ADD_TOPICS_PAGE}
}
