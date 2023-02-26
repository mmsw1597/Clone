import Video from "../models/Video";

//async await으로 데이터 찾기
//call back 방식과 다르게 JS가 await 구문을 기다리게끔 한다.
//call back의 경우는 JS가 call back 함수를 뒤로 미루고 아래 코드로 이동했음
//async await은 await 구문이 끝나야지만 아래 코드를 수행함
//즉, 코드 순서와 JS의 동작 순서가 같아짐
//단, 콜백의 경우 error 매개변수를 갖기 때문에 단순 if문으로 error 발생 여부를 확인할 수 있지만
//async await의 경우는 error 매개변수가 없기 때문에 try catch문을 사용해야함

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  //비디오를 비디오 배열에 추가할 예정
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`)),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
  //1. post request를 받을 컨트롤러임.
  //2. redirect를 하여 브라우저에게 홈페이지로 가도록 할 예정. 이때 브라우저는 총 2번의 url을 통과하게 될거임. 하나는 upload 하나는 홈페이지
  //3. request의 body를 통해 input값을 받아올 수 있음. 이때 input은 반드시 name 속성 값을 명시해야 됨.
};
//export default는 하나밖에 export하지 못함
//redirect는 특정 url로 이동하게끔 하도록 함
//express가 form을 이해할 수 있도록 서버 설정이 필요함
//서버 설정 후 body를 통해 form의 name은 key, value는 value로 받아올 수 있음
