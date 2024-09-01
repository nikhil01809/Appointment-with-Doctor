import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import userModel from '../model/userModel.js';
import jwt from "jsonwebtoken";

dotenv.config();

const initializePassport = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/v1/user/google/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      try{
        if (profile && profile.emails && profile.emails.length > 0 && profile.photos && profile.photos.length > 0){
        let user=await userModel.findOne({email:profile?.emails[0].value});
       if(!user){
         user=new userModel({
          name:profile.displayName,
          profileImage:profile?.photos[0].value,
          email:profile?.emails[0].value,
          password:profile.id
        })
        await user.save();
       }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        user.token=token; 
         cb(null,user,{token});
      }
      }
      catch(error){
        console.log(error);
        cb(error);
      }

     }));

    passport.serializeUser(function(user,done){
      done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
      userModel.findById(id,function(err,user){
        done(err,user);
      })
    })
}

export default initializePassport;