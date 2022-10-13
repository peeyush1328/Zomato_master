import googleOAuth from "passport-google-oauth2";

import { Usermodel } from "../Databases/Allmodels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLECLIENT_KEY,
        clientSecret: process.env.GOOGLECLIENT_SECRET_KEY,
        callbackURL: "http://localhost:8088/auth/google/callback",
      },

      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };

        try {
          const user = await Usermodel.findOne({ email: newUser.email });

          if (user) {
            const token = user.generateJwtToken();
            done(null, { user, token });
          } else {
            const user = await Usermodel.create(newUser);
            const token = user.generateJwtToken();

            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};