/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var getStock = require('../interfaces/getStock')


module.exports = function (app) {
  app.route('/api/stock-prices')
    .get(async function (req, res){
    console.log("req.query",req.query)
      const {stock,like}=req.query
      
      if(stock instanceof Array){
        
        //se envio dos stocks

        const mapStockArr=(stockArr)=>new Promise((resolve,reject)=>{
          const result=[]
          console.log('stockArr',stockArr)
          stockArr.forEach(async (stock,index)=>{
            try{
              const {data}=await getStock(stock)
              console.log("data.latestPrice",data.latestPrice)
              if(like){
                result.push({ stock, price: `${data.latestPrice}`, rel_likes: 1-index })
              }else{
               result.push({ stock, price: `${data.latestPrice}`, rel_likes: 0 })
              }
              if(result.length === stockArr.length){
                console.log("dos stocks array",result,index)
                resolve(result)
              }
            }catch(err){
              console.error('huno error en el servicio',err)
              reject()
            }
          }) 
         
        })        
        
        try{
          const resolveArr=await mapStockArr(stock)
          res.json(resolveArr)
        }catch(err){
          
        }
        
        return
      }
    

      try{ 
        const {data}=await getStock(stock)
        //ask for likes
        const dataToResponse=like?{ stock, price: `${data.latestPrice}`, likes: 1 }:{ stock, price: `${data.latestPrice}`, likes: 0 };
        res.json(dataToResponse)
        }catch(err){
          console.error('huno error en el servicio',err)
           res.send('error getting stock from service')
        }   
    });
  
  
  
};
