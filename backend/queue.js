const axios = require("axios");

const url =  process.env.ROOT_URL+'api/queue/sendmail';
 
axios.get(url, { headers: {'access-scheduler': true}})
 .then(res => {
   console.log(res);
 }).catch(e => {
    console.log(e)
 })