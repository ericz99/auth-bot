const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userKey: {
    type: String,
    unique: true,
    required: true
  },
  authenicated: {
    type: Boolean,
    default: false
  },
  discordUserID: {
    type: String
  },
  membership: {
    type: String,
    default: "Renewal"
  },
  currentDate: {
    type: Date,
  },
  expiredDate: {
    type: Date
  }
});

// const MembershipSchema = new Schema({
//   membership: {
//     type: String,
//     default: "Renewal"
//   },
//   currentDate: {
//     type: Date,
//   },
//   expiredDate: {
//     type: Date
//   }
// });

module.exports = User = mongoose.model('users', UserSchema);