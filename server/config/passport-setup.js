const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User')
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
  .catch((err) => {
    done(new Error(err));
  });
});

passport.use(new GoogleStrategy({
  //options for the google strat
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect"
  }, 
  async (token, tokenSecret, profile, done) => {
    // find current user in UserModel
    const currentUser = await User.findOne({
    googleID: profile.id
  });
  
  if(!currentUser) {
    const newUser = await new User({
      name: profile.displayName,
      googleID: profile.id,
      profileImageURL: profile.photos[0].value
    }).save();
    if (newUser) {
      done(null,newUser);
    }
  }
  done(null, currentUser);  
})
)