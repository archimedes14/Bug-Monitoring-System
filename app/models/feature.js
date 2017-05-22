var mongoose = require('mongoose');

var FeatureSchema = mongoose.Schema({

  feature: String,
  featureCreatedBy: String,
  featureDescription: String,
  featureAssignee: String,
  featureStackHolders: [String],
});

module.exports = mongoose.model('Feature', FeatureSchema);

