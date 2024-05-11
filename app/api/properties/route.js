import connectDB from "@/config/db";

export const GET = async (request) => {
  try {
    await connectDB();

    return new Response();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
