// app/routes.js
module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });

  });

  // process the signup form
  // app.post('/signup', do all our passport stuff here);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)

  var Feature = require('./models/feature');
  
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });
//-----------------------------Tried to display item
//------------CAN BE REMOVED------------------------
//--------------------------------------------------
//--------------------------------------------------
  app.get('/display', function(req,res){
    Feature.find(function(err, Feature) {
      if (err) {
        res.send(err);
      } else {
        res.json(Feature)
      }
    });
  })


  //======================================
  // ADD FEATURE =========================
  //======================================
  //var Feature = require('./models/feature');

  app.post('/feature', function(req, res) {
    var feature = req.body.featureName;
    var featureCreatedBy = req.user.local.email;
    var featureDescription = req.body.featureDescription;
    var featureAssignee = req.body.featureAssignee;
    var featureStackHolders = req.body.myInputs;

    console.log(featureCreatedBy);

    var newFeature = new Feature({
      feature: feature,
      featureCreatedBy: featureCreatedBy,
      featureDescription: featureDescription,
      featureAssignee: featureAssignee,
      featureStackHolders: featureStackHolders
    });
    Feature.createFeature(newFeature, function(err, feature) {
      if (err)
        throw err;
      console.log(feature);
    });
    res.redirect('/profile');
  });
  
  //=====================================
  // BUGS LIST ==========================
  //=====================================

  app.get('/profile/:id/bugs',isLoggedIn, function(req, res) {
    //res.send('user '+req.params.id+' bugs');
    console.log('user '+req.params.id+' bugs');
    res.render('bugs.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// process the signup form
