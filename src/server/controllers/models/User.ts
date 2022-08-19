import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://navigatedlearning.org/assets/gooru/profile-d8cfa58723f9c1daaa7ff6986738f816.png",
  },
});

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    const newDocument = { ...ret };
    // eslint-disable-next-line no-underscore-dangle
    delete newDocument.__v;
    // eslint-disable-next-line no-underscore-dangle
    delete newDocument._id;
    return newDocument;
  },
});

const User = model("User", userSchema, "users");

export default User;
