import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

//URL 파라미터
//URL안에 변수를 포함시킬 수 있게 함
//순서가 중요함 변수 파라미터가 upload url 위로 오면 아래에 있는 upload URL로 갈때 upload 문자열 자체를 id로 받아버림
//정규표현식을 통해 id가 무조건 숫자임을 명시하면 순서를 바꿔도 상관없음
//옆에 id를 붙인이유는 파라미터를 변수로 불러와야 하기 때문. 그래서 id라는 이름을 붙여줌
videoRouter.get("/:id([0-9a-f]{24})", watch);
//하나의 url에 get, post 방식을 쓰도록 할때 유용함
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);

export default videoRouter;
