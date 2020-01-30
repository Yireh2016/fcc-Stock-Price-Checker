let axios = require('axios')

 const apiGet=(url)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url).then((res)=>{
      resolve(res)
    })
    .catch(err=>{reject(err)})
  })
  
}
 
 module.exports=apiGet