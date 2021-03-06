export const URL = "https://cnodejs.org/api/v1";
const TOPIC_LIMIT = 5;

/**
 * Topics
 * 获取主页主题
 * @param page 页数
 * @param tab 主题分类(不传就是获取全部)
 * @param mdrender 是否渲染为md
 */

export const fetchTopics = (params)=>{
  let url = URL + `/topics?`;
  for(let key in params){
    url += `&${key}=${params[key]}`
  }
  return new Promise((resolve,reject)=>{
      fetch(url,{
      method: 'GET',
      })
      .then(response=>response.json())
      .then((res)=>{
         resolve(res)
      })
      .catch((error)=>{
         reject(error)
      })
  })
}

/**
 *获取topic详情
 * @param topicId 主题id
 * @param token 用户accesstoken
 **/
export const fetchTopicDetail = (topicId,token)=>{
      let url = URL + `/topic/${topicId}?mdrender=false`,
          processUrl;
      if(token){
         processUrl = url + `&&accesstoken=${token}`
      }
      return new Promise((resolve,reject)=>{
        fetch(url,{
          method:'GET',
        })
        .then(response=>response.json())
        .then((res)=>{
           resolve(res)
        })
        .catch((error)=>{
          reject(error)
        })
      })
}

/**
 *通过accessToken登录
 * @param accesstoken 需要验证的accesstoken
 **/
export const accessToken = (accesstoken)=>{
       let url = URL + '/accesstoken';
       return new Promise((resolve,reject)=>{
         fetch(url,{
           method:'POST',
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
           body:JSON.stringify({
            accesstoken
          })
         })
         .then(response=>response.json())
         .then((res)=>{
            resolve(res)
         })
         .catch((error)=>{
           reject(error)
         })
       })
}



/**
 *通过accessToken获取用户所有已读和未读信息
 * @param accesstoken 需要验证的accesstoken
 **/
export const fetchMessages = (accesstoken)=> {
      let url = URL + `/messages?accesstoken=${accesstoken}&&mdrender=false`;
      return new Promise((resolve,reject)=>{
        fetch(url,{
          method:'GET'
        })
        .then((response)=> response.json())
        .then((res)=>{
          resolve(res)
        })
        .catch((error)=>{
          reject(error)
        })
      })
}

/** 
 * 通过 username 获取用户信息
 * @param username 需要查询的用户名
 **/

 export const fetchUserInfoDetail = (username) =>{
     let url = URL + `/user/${username}`
     return new Promise((resolve,reject)=>{
      fetch(url,{
        method:'GET'
      })
      .then((response)=> response.json())
      .then((res)=>{
        resolve(res)
      })
      .catch((error)=>{
        reject(error)
      })
    })
  }


  /** 
   *  新建主题
   *  @param accesstoken 用于校验用户
   *  @param title 主题标题
   *  @param context 主体内容
   *  @param tab  (ask,share,job,dev)
   *  测试默认发送 dev   
   *      
   */
   export const postTopic = ({accesstoken,title,content,tab}) => {
     let url = URL + `/topics`;
     return new Promise((resolve,reject)=>{
      fetch(url,{
        method:'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body:JSON.stringify({
         accesstoken,
         title,
         content,
         tab
       })
      })
      .then(response=>response.json())
      .then((res)=>{
         resolve(res)
      })
      .catch((error)=>{
        reject(error)
      })
    })

   }



   /** 
    *  回复功能
    *  @param topicId 主题id
    *  @param accesstoken 用户的accesstoken
    *  @param content 评论的主体内容
    *  @param reply_id 对评论的回复时需要带此参数(可省略)
   */


   export const postReply = (topicId,accesstoken,content,replyId)=>{
       
       let replyData = {},
            url = URL +  `/topic/${topicId}/replies`;
       if(replyId){
           replyData = {
             accesstoken:accesstoken,
             content:content,
             reply_id:replyId
           }
       }else{
        replyData = {
          accesstoken:accesstoken,
          content:content,
        }
       }
       return new Promise((resolve,reject)=>{
        fetch(url,{
          method:'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body:JSON.stringify(replyData)
        })
        .then(response=>response.json())
        .then((res)=>{
           resolve(res)
        })
        .catch((error)=>{
          reject(error)
        })
      })

   }

  /**
   *  收藏主题
   * @param {*} topicId  主题id
   * @param {*} accesstoken  用户accesstoken
   */
   export const collectTopic = (topicId,accesstoken) => {
       let url = URL + "/topic_collect/collect";
       return new Promise((resolve,reject)=>{
        fetch(url,{
          method:'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body:JSON.stringify({
            topid_id:topicId,
            accesstoken:accesstoken
          })
        })
        .then(response=>response.json())
        .then((res)=>{
           resolve(res)
        })
        .catch((error)=>{
          reject(error)
        })
      })
   }
   
   /**
   *  取消收藏主题
   * @param {*} topicId  主题id
   * @param {*} accesstoken  用户accesstoken
   */
   export const cancelCollectTopic = (topicId,accesstoken) => {
    let url = URL + "/topic_collect/collect";
    return new Promise((resolve,reject)=>{
     fetch(url,{
       method:'POST',
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
       body:JSON.stringify({
         topic_id:topicId,
         accesstoken:accesstoken
       })
     })
     .then(response=>response.json())
     .then((res)=>{
        resolve(res)
     })
     .catch((error)=>{
       reject(error)
     })
   })
}
