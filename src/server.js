import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
//mongodb://127.0.0.1:27017/wetube
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

//쿠키 구성 요소
/*
  secret : 쿠키에 sign할때 사용하는 string. 다시말해 해당 쿠키가 우리의 backend에서 만들었음을 증명하는 문자열 (누군가 쿠키를 훔쳐 가짜행세를 하는 것을 방지)
  domain : 쿠키를 만든 backend가 누군지를 명시
  expires: 만료날짜. 명시하지않으면 session-cookie가 되고 브라우제어서 프로그램을 닫으면 쿠키가 사라진다.
  max-age: 쿠키의 유효시간
*/

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, //세션이 만들어지고 수정된 적이 없을 때 초기화(DB에 저장)하지 않는다. 세션 수정은 userController에서 가능
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), //세션을 몽고 db에 저장
    //단점은 익명의 사용자 혹은 봇이 악의적으로 브라우저를 통해 웹 페이지에 입장할때마다 DB에 세션이 쌓이게됨
    //로그인한 유저의 정보만 세션에 저장하도록 설정이 필요함
    //DB url과 secret key 값은 보호해야함
    //.env 파일에 보호해야하는 값들을 저장하고, 해당 .env파일을 gitignore에 추가
    //단순히 파일에 저장하면 process_env에 저장되지 않으므로 dotenv 라이브러리의 도움을 받아야함
  })
);
//Router
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
