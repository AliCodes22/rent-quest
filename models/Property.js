import { models, model, Schema } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      unique: [true, "name already exists"],
      required: [true, "please enter a name"],
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
        required: true,
      },
      monthly: {
        type: Number,
        required: true,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
