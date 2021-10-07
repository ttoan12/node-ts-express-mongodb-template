import { Request } from "express";
import { PassportStatic } from "passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import User from "../models/User";

const passportJwt = (passport: PassportStatic) => {
    passport.use(
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.SECRET_KEY,
                algorithms: ["HS256"],
                passReqToCallback: true,
            },
            (req: Request, jwt_payload: any, done: VerifiedCallback) => {
                User.findById(jwt_payload._id, (err: any, user: any) => {
                    if (err || !user) return done(err, false);

                    req.user = user;
                    done(err, user);
                }).lean();
            }
        )
    );

    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: any, done: any) => {
        User.findById(id, (err: any, user: any) => done(err, user));
    });
};

module.exports = passportJwt;
