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
      "https://navigatedlearning.org/assets/gooru/profile-d8cfa58723f9c1daaa7ff6986738f816.png",
  },
});

const User = model("User", userSchema, "users");

export default User;
