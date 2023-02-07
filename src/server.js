import express from "express";
import morgan from "morgan";

const PORT = 4000;

//express 어플리케이션 생성
const app = express();
//응답의 method, url, 응답코드, 응답시간을 출력해주는 미들웨어
const loggerMiddleware = morgan("dev");

app.use(loggerMiddleware);
app.get("/", (req, res) => {
  //return res.end(); //request를 종료시키는 함수
  return res.send("send you"); //request에 대하여 메시지를 보내는 함수
});

//서버를 외부에 개방
const handleListening = () => console.log("Server listening on port 4000");

app.listen(PORT, handleListening);
