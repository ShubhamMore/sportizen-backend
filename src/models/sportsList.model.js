const mongoose = require('mongoose');
const validator = require('validator');

const sportsListSchema = new mongoose.Schema({
    sportName:{
        type:String,
        required:true
    },
    sportDetails:{
        type:String,
    }
})

const SportList = mongoose.model('sportlist',sportsListSchema)

module.exports = SportList