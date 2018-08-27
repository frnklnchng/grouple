const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // subredditId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'subreddits'
  // },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;