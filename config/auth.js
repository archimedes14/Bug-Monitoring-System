var Feature = require('./models/feature');
Feature.createFeature = function(newFeature, callback) {
newFeature.save(callback);}