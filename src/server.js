import express from "express";
import morgan from "morgan";

const PORT = 4000;

//express 어플리케이션 생성
const app = express();
//응답의 method, url, 응답코드, 응답시간을 출력해주는 미들웨어
const loggerMiddleware = morgan("dev");
app.use(loggerMiddleware);

//라우터 설정 (총 3가지 라우터 : 글로벌, users, video)
// 1. 누군가 /videos로 시작하는 url에 접근
// 2. videoRouter에 있는 컨트롤러를 찾게 함
// 3. 현재 컨트롤러는 /watch에 대한 get 요청처리 컨트롤러 밖에 없음

// 라우터는 url 정리정돈을 도와준다고 보면 됨

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

//서버를 외부에 개방
const handleListening = () => console.log("Server listening on port 4000");

app.listen(PORT, handleListening);
