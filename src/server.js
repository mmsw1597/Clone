import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

//express 어플리케이션 생성
const app = express();
//응답의 method, url, 응답코드, 응답시간을 출력해주는 미들웨어
const loggerMiddleware = morgan("dev");

//view engine을 pug로 설정
app.set("view engine", "pug");
//views 디렉토리 경로 재설정
app.set("views", process.cwd() + "/src/views");

//미들웨어
app.use(loggerMiddleware);
//express가 form의 value들을 이해할 수 있도록 함
//value(body)를 보기 좋게 해줌
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
  })
);
//Router
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
