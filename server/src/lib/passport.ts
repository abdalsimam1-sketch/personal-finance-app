import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
} from "passport-google-oauth20";
import { prisma } from "./prisma.js";
import { BadRequestError } from "../errors/errors.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) => {
      try {
        // Your database logic here (e.g., User.findOrCreate)
        const email = profile?.emails?.[0]?.value;
        const name = profile?.displayName;

        if (!email) {
          return done(new BadRequestError("No email returned from Google"));
        }
        if (!name) {
          return done(new BadRequestError("No name returned from Google"));
        }
        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              name,
              email,
              isVerified: true,
              provider: "google",
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    },
  ),
);

export default passport;
