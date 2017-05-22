var mongoose = require('mongoose');

var BugSchema = mongoose.Schema({
  			feature_id: String,
        bug_title: String,
  			bug_description: String,
  			bug_screenshot: [String],
  			bug_creationDate: Date,
  			bug_lastUpdatedDate: Date,
  			bug_assignee: String,
  			bug_loggedBy: String,
  			bug_location: String,
  			bug_status:String,
  			bug_priority:String
});

module.exports = mongoose.model('Bug', BugSchema);
