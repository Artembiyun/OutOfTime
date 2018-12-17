const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        requried: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true
    },
    location:{
        type: {
            type: String,
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Schema.Types.Decimal128],
            required: true
        },
    },
    phone_number:{
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: false
    },
    rating:{
        type: Number,
        required: false
    },
    date_created:{
        type: Date,
        required: true,
        default: new Date()
    }
});
usersSchema.index({"location.coordinates": '2dsphere'});
// usersSchema.gis.ensureIndex({"location": "2dphere"});
const Users = mongoose.model('User', usersSchema);
module.exports = Users;