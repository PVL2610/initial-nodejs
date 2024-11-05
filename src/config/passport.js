const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user.model'); 
const userService = require('../services/userService');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()


passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await userService.findByEmail(email);
    if (!user) {
      return done(null, false, { message: 'Email không hợp lệ.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Mật khẩu không đúng.' });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };
  
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
try {
    const user = await userService.getUserById(jwt_payload.user_id);
    if (user) {
    return done(null, user);
    }
    return done(null, false);
} catch (error) {
    return done(error, false);
}
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID, // Thay bằng Facebook App ID của bạn
  clientSecret: process.env.FACEBOOK_APP_SECRET, // Thay bằng Facebook App Secret
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await userService.findByEmail(email);

    if (!user) {
      const newUser = {   
        name: profile.displayName,
        email: email,
        password: null
      };
      const userId = await userService.createFacebookUser(newUser);
      user = await userService.getUserById(userId);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));


passport.use(new GoogleStrategy({
    clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
    clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userService.findByEmail(profile.emails[0].value);
      
      if (!user) {
        const googleUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
        };
        const userId = await User.createFacebookUser(googleUser);
        user = await userService.getUserById(userId);
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));



