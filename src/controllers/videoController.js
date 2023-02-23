import Video from "../models/Video";

export const home = (req, res) => {
  //call back 방식으로 데이터 찾기
  //첫번째 인자는 search term이다. 비어있다면 모든 형태를 찾는다는 의미.
  Video.find({}, (err, videos) => {
    console.log("errors", err);
    console.log("videos", videos);
    return res.render("home", { pageTitle: "Home", videos });
  });
};
export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watch` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Edit` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  //비디오를 비디오 배열에 추가할 예정
  const { title } = req.body;
  videos.push(newVideo);
  //1. post request를 받을 컨트롤러임.
  //2. redirect를 하여 브라우저에게 홈페이지로 가도록 할 예정. 이때 브라우저는 총 2번의 url을 통과하게 될거임. 하나는 upload 하나는 홈페이지
  //3. request의 body를 통해 input값을 받아올 수 있음. 이때 input은 반드시 name 속성 값을 명시해야 됨.
  return res.redirect("/");
};
//export default는 하나밖에 export하지 못함
//redirect는 특정 url로 이동하게끔 하도록 함
//express가 form을 이해할 수 있도록 서버 설정이 필요함
//서버 설정 후 body를 통해 form의 name은 key, value는 value로 받아올 수 있음
