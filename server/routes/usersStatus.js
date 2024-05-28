
const express = require('express')
const userModel = require('../schema/user')
const router = express.Router()

router.post('/userstatus',(req,res)=>{
   userModel.find()
   .then((result)=>{
    res.json(result)
   })

})
module.exports = router