import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User id is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const messages = await Message.find({
      recipient: userId,
    })
      .populate("sender", "name")
      .populate("property", "title");

    return new Response(JSON.stringify(messages));
  } catch (error) {
    console.log(error);
  }
};
