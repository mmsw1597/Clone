import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.render("join", {
      pageTitle: "Create Account",
      errorMessage: "비밀번호가 서로 일치하지 않습니다",
    });
  }

  //지금은 연습이니까 이렇게 만듦 (username, email 둘 중 하나가 중복이면 에러메시지 전송. 실제로 이렇게 구현하면 뭐가 중복인지 유저는 모름)
  //상태 코드가 200이면 성공으로 인식하기 때문에 닉네임이 사용중이어도 구글에선 해당 비밀번호를 저장하겠냐고 물음이 옴
  //그걸 방지하기위해 400에러를 발생시킴
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "해당 닉네임은 이미 사용 중입니다.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Delete User");
export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "Login",
  });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "아이디가 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }

  //check if password correct

  return res.redirect("/");
};

export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");
