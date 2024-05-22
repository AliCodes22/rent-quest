import connectDB from "@/config/db";
import Property from "@/models/Property";

import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    console.log(properties);
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
