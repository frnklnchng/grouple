const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubredditSchema = new Schema({
});

const Subreddit = mongoose.model('subreddits', SubredditSchema);
module.exports = Subreddit;