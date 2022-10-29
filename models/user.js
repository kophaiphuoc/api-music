const mongoose = require('mongoose');
const user = new mongoose.Schema({
    email:{
        type:"String",
        require:true,
      
    },
    name:{
        type:"String",
        require:true,
      
    },
    password:{
        type:"String",
        require:true,
    }
})
let users = mongoose.model("users",user);
module.exports = {users};