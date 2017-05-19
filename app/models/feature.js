var mongoose = require('mongoose');

var FeatureSchema = mongoose.Schema({

  feature: String,
  featureCreatedBy: String,
  featureDescription: String,
  featureAssignee: String,
  featureStackHolders: [String]
});

var Feature = mongoose.model('Feature', FeatureSchema);
module.exports = Feature;

module.exports.createFeature = function(newFeature, callback) {
  newFeature.save(callback);
}
