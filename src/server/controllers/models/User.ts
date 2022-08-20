import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  enemies: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model("User", userSchema, "users");

export default User;
