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
