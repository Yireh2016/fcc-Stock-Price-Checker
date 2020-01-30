var apiGet = require('../apiCall/apiCall.js')

const getStock=(stock)=>apiGet(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`)

module.exports=getStock