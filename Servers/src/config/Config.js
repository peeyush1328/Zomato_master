import passportJWT from "passport-jwt";
import { Usermodel } from "../Databases/Allmodels";


const Jwtstrategy = passportJWT.Strategy;
const Jwtextract = passportJWT.ExtractJwt;

const options = {
  jwtFromRequest: Jwtextract.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Peeyush",
};
export default (passport) => {
  passport.use(
    new Jwtstrategy(options, async (payload, done) => {
      try {
        const userExist = await Usermodel.findById(payload.user);
        if (!userExist) return done(null, false);
        return done(null, userExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};

