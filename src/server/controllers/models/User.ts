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
    default:
      "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  enemies: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model("User", userSchema, "users");

export default User;
