import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  socialOnly: { type: Boolean, default: false },
});

//유저 정보를 저장하기 전, 패스워드를 해싱
//hash의 두번째 매개변수는 해쉬를 몇번 반복하는지 횟수를 가리킴
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("user", userSchema);

export default User;
