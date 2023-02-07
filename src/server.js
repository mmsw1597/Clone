import express from "express";

const PORT = 4000;

//express 어플리케이션 생성
const app = express();

//서버를 외부에 개방하기전 서버 설정
//루트 페이지로 get 요청이오면 call back 함수를 실행.
//이때 콜백 함수는 2가지 인자 object를 받을 수 있는데 첫째는 req, 둘째는 res 객체임
//call back 함수는 한가지 인자를 더 받는데 그것은 next라는 인자임 next는 여러 call back을 받았을때
//자신의 다음 callboack을 가리키게됨. 이때 return 하지 않고 next를 호출하는 함수를 middleware라고함.
//return을 하게되면 controller가 됨

const gossipMiddleware = (req, res, next) => {
  console.log(req.url);
  next(); //finalware 호출
};

app.get("/", gossipMiddleware, (req, res) => {
  //return res.end(); //request를 종료시키는 함수
  return res.send("send you"); //request에 대하여 메시지를 보내는 함수
});

app.get("/login", (req, res) => {
  return res.send("login you");
});

//서버를 외부에 개방
const handleListening = () => console.log("Server listening on port 4000");

app.listen(PORT, handleListening);
