import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

//export
//default export 를 사용하여 다른 곳에서 import할때 다른 변수 이름을 사용가능
//하지만 보통은 혼란은 방지하기 위해 같은 이름을 사용
//default export는 한개밖에 export하지 못함
//non-default export를 사용하여 여러개를 export할 수 있음
//이때 import 하는 곳에선 오브젝트로 해당 export 모듈을 받을 수 있음
export default rootRouter;
