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


    /* For Feature Collection */
    var Feature = require('./models/feature');
    Feature.createFeature = function(newFeature, callback) {
            newFeature.save(callback);
        }
        /*-----------------------------------------------------------*/


    /* For Bug Collection */
    var Bug = require('./models/bug');
    Bug.createBug = function(newBug, callback) {
            newBug.save(callback);
        }
        /*-----------------------------------------------------------*/

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    //======================================
    // VIEW FEATURE=========================
    //======================================
    //var Feature = require('./models/feature');
    app.get('/display', function(req, res) {
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

        var newFeature = new Feature({
            feature: feature,
            featureCreatedBy: featureCreatedBy,
            featureDescription: featureDescription,
            featureAssignee: featureAssignee,
            featureStackHolders: featureStackHolders,
        });
        Feature.createFeature(newFeature, function(err, feature) {
            if (err)
                throw err;
            console.log(feature);
        });
        res.redirect('/profile');
    });

    //=====================================
    // FEATURE UPDATE =====================
    //=====================================
    app.post('/:id/featureupdate', isLoggedIn, function(req, res) {
        backURL = req.header('Referer') || '/';
        var NewfeatureDescription = req.body.featureDescription;
        Feature.update({ "_id": req.params.id }, {
            featureDescription: NewfeatureDescription
        }, function(err, affected, resp) {
            console.log(resp);
        });
        res.redirect(backURL);
    });

    //=====================================
    // FEATURE DELETE =====================
    //=====================================
    app.post('/:id/featuredelete', isLoggedIn, function(req, res) {
        Feature.findOneAndRemove({ "_id": req.params.id }, function(err, feature) {
            if (err) {
                throw err;
            }
            console.log(feature);
        })
        res.redirect('/profile');
    });

    //=====================================
    // BUGS LIST ==========================
    //=====================================
    app.get('/profile/:id/bugs', isLoggedIn, function(req, res) {
        //console.log('user '+req.feature.feature+' bugs');
        Feature.find({ "_id": req.params.id },
            function(err, feature) {
                res.render('bugs.ejs', {
                    user: req.user, // get the user out of session and pass to template
                    feature: feature[0]
                });
            });
    });

    //=====================================
    // BUGS REGISTRATION PAGE =============
    //=====================================

    app.get('/profile/:id/bug_registration', isLoggedIn, function(req, res) {
        Feature.find({ "_id": req.params.id },
            function(err, feature) {
                console.log(feature);
                res.render('bug_registration.ejs', {
                    user: req.user, // get the user out of session and pass to template
                    feature: feature[0]
                });
            });
    });

    //========================================
    // ADD BUG ===============================
    //========================================

    app.post('/profile/:id/bug_registration', function(req, res) {
        backURL = req.header('Referer') || '/';
        var feature_id = req.body.feature_id;
        var bug_title = req.body.bug_title;
        var bug_description = req.body.bug_description;
        //var bug_screenshot = req.body.input-6;    /// will upload in seperate page
        var bug_creationDate = req.body.bug_creationDate;
        var bug_lastUpdatedDate = req.body.bug_creationDate;
        var bug_assignee = req.body.feature_assignee;
        var bug_loggedBy = req.user.local.email;
        var bug_location = req.body.bug_location;
        var bug_status = req.body.bug_status;
        var bug_priority = req.body.bug_priority;
        console.log(req.body.bug_creationDate);

        var newBug = new Bug({
            feature_id: feature_id,
            bug_title: bug_title,
            bug_description: bug_description,
            bug_creationDate: bug_creationDate,
            bug_lastUpdatedDate: bug_lastUpdatedDate,
            bug_assignee: bug_assignee,
            bug_loggedBy: bug_loggedBy,
            bug_location: bug_location,
            bug_status: bug_status,
            bug_priority: bug_priority,

        });
        Bug.createBug(newBug, function(err, bug) {
            if (err)
                throw err;
            console.log(bug);
        });
        res.redirect(backURL);
    });
    //======================================
    // VIEW BUG=============================
    //======================================
    //var Bug = require('./models/bug');====
    app.get('/displaybug', isLoggedIn, function(req, res) {
        //console.log(req.query.id)
        Bug.find({ "feature_id": ((req.query.id).trim()) },
            function(err, Bug) {
                if (err) {
                    throw err;
                    console.log("Error");
                } else {
                    console.log(err, Bug);
                    res.json(Bug)

                }
            });
    });

    //======================================
    // BUG DESCRIPTION PAGE=================
    //======================================
    //===var Bug = require('./models/bug')=
    app.get('/profile/:fid/:id/bugdetail', isLoggedIn, function(req, res) {
        Bug.find({ "_id": req.params.id },
            function(err, bug) {
                res.render('bug_desc.ejs', {
                    user: req.user, // get the user out of session and pass to template
                    bug: bug[0]
                });
            });
    });
    //=====================================
    // BUG STATUS UPDATE ===================
    //======================================
    app.post('/:id/bugStatusUpdate', isLoggedIn, function(req, res) {
        backURL = req.header('Referer') || '/';
        var Newbug_status = req.body.bug_status;
        Bug.update({ "_id": req.params.id }, {
            bug_status: Newbug_status,
            bug_lastUpdatedDate: Date()
        }, function(err, affected, resp) {
            console.log(resp);
        });
        res.redirect(backURL);
    });

    //=====================================
    // BUG PRIORITY UPDATE ===================
    //======================================
    app.post('/:id/bugPriorityUpdate', isLoggedIn, function(req, res) {
        backURL = req.header('Referer') || '/';
        var Newbug_priority = req.body.bug_priority;
        Bug.update({ "_id": req.params.id }, {
            bug_priority: Newbug_priority,
            bug_lastUpdatedDate: Date()
        }, function(err, affected, resp) {
            console.log(resp);
        });
        res.redirect(backURL);
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
