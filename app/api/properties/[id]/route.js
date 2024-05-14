import Property from "@/models/Property";
import connectDB from "@/config/db";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    console.log(params.id);

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
