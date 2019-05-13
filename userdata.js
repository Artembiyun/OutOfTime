var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Id Schema - use for Login info
var UsersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
    required: true,
    unique: true
  },
  //   date: {     type: Date,     default: Date.now   },
  date: {
    type: Number
  },
  history: [
    {
      date: Number,
      percent: Number
    }
  ],
  daily: [
    {
      name: String,
      habits: [
        {
          name: String,
          value: Boolean
        }
      ]
    }
  ]
});

const Users = mongoose.model('User', UsersSchema);
module.exports = Users;