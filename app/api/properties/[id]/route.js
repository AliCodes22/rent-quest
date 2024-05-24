import Property from "@/models/Property";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";

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

export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Userid is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response("Property not found", {
        status: 404,
      });
    }

    if (property.owner.toString() !== userId) {
      return new Response("Not the owner", {
        status: 401,
      });
    }

    await property.deleteOne();

    return new Response("property deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
