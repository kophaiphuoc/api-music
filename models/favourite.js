const mongoose = require('mongoose');
const favorutie = new mongoose.Schema({
    id_song:{
        type:String,
        require:true,
    },
    link_song:{
        type:String,
        require:true
    },
    name_song:{
        type:String,
        require:true
    },
    name_art:{
        type:String,
        require:true
    },
    img_song:{
        type:String,
        require:true
    },

});
let favoruties = mongoose.model("favoruties",favorutie);
module.exports = {favoruties};