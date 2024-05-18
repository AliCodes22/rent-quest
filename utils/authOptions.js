import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callback: {
    async signIn({ profile }) {
      await connectDB();

      const userExists = await User.findOne({
        email: profile.email,
      });

      if (!userExists) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          userName: username,
          image: profile.picture,
        });
      }

      return true;
    },

    // Modifies the session object
    async session({ session }) {
      const user = await User.findOne({
        email: session.user.email,
      });
      session.user.id = user._id.toString();

      return session;
    },
  },
};
