import User from "../models/User";

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
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", {
      pageTitle: "Create Account",
      errorMessage: "해당 닉네임은 이미 사용 중입니다.",
    });
  }
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");
