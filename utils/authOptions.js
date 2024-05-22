import connectDB from "@/config/db";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      scope: "openid profile email",
      // For offline access and consent prompt
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      try {
        // Ensure database connection
        await connectDB();

        // Trim username to maximum 20 characters
        const username = profile.name.slice(0, 20);

        // Create user in the database if not exists
        await User.findOneAndUpdate(
          { email: profile.email },
          {
            email: profile.email,
            username,
            image: profile.picture,
            provider: account.provider, // Save provider information
          },
          { upsert: true } // Upsert: Insert if not exists, update if exists
        );

        // Return true to indicate successful sign-in
        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        return false; // Return false to indicate failure
      }
    },

    async session({ session, token }) {
      try {
        // Ensure database connection
        await connectDB();

        // Get user from database using email from session or token
        const user = await User.findOne({
          email: session.user.email || token.email,
        });

        // If user found, assign the user id to the session
        if (user) {
          session.user.id = user._id.toString();
        } else {
          // If user not found, clear the session
          delete session.user;
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
        delete session.user; // Clear session on error
      }

      return session;
    },
  },
};
