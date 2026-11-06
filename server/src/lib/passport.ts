import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./prisma.js";
import { BadRequest } from "../errors/errors.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // find or create the user here, then:

      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          throw new BadRequest("Profile does not exist");
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              isVerified: true,
              email,
              provider: "google",
            },
          });
        } else if (!user.isVerified) {
          user = await prisma.user.update({
            where: {
              email,
            },
            data: {
              isVerified: true,
            },
          });
        }
        done(null, user);
      } catch (error) {
        return done(error);
      }
      // done(null, user);
    },
  ),
);
