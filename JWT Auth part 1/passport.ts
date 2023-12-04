import * as dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./db";

const { SECRET } = process.env;

dotenv.config();

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = db.one(`SELECT * FROM planets WHERE id=$1`, payload.id);
      console.log(user);
      try {
        return user ? done(null, user) : done(new Error("User not found"));
      } catch (err) {
        done(err);
      }
    }
  )
);
