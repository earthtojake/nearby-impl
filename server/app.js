const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');

const PORT = 8080;
const app = express();
const { apolloExpress, graphiqlExpress } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost/reach/3');

const seed = require('./seed');
seed();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
// Import Facebook and Google OAuth apps configs
const { facebook } = require('./config');

const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

const {UserModel} = require('./model');

passport.use(new FacebookStrategy(facebook,
  // Gets called when user authorizes access to their profile
  function (token, refreshToken, profile, done) {
    process.nextTick(function() {
      // find the user in the database based on their facebook id

      UserModel.findOne({ 'fb_id' : profile.id }, function(err, user) {
        if (err)
          return done(err);
        else {
          // if there is no user found with that facebook id, create them
          var newUser = new UserModel();
          console.log(profile);

          // set all of the facebook information in our user model
          newUser.fb_id = profile.id;                  
          newUser.fb_token = token;                  
          newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.picture = profile.photos[0].value;

          // save our user to the database
          newUser.save(function(err) {
            // if successful, return the new user
            return done(err, newUser);
          });
        }
      });
    });
  }
));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol Reach
  (req, res) => {
    res.redirect(`Reach://login?user=${JSON.stringify(req.user)}`);
  });

function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
  next();
}

app.use(isLoggedIn);

const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {
    constructor: Connectors,
  },
  rootValue: 'Hello World',
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
