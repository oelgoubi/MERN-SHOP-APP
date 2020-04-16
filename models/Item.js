const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema

const ItemSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});




// item present the items collection in the db 
module.exports = Item = mongoose.model('item',ItemSchema);