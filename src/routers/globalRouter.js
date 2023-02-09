import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

//export
//default export 를 사용하여 다른 곳에서 import할때 다른 변수 이름을 사용가능
//하지만 보통은 혼란은 방지하기 위해 같은 이름을 사용
export default globalRouter;
