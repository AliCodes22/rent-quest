import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User id is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", {
        status: 404,
      });
    }

    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    message.read = !message.read;

    await Message.save();

    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Something went wrong", {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User id is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", {
        status: 404,
      });
    }

    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    await message.deleteOne();

    return new Response(JSON.stringify("Message deleted"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Something went wrong", {
      status: 400,
    });
  }
};