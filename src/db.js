import mongoose from "mongoose";

//경고 처리
mongoose.set("strictQuery", true);
//mongoose를 통해 mongoDB와 연결.
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");

//DB에 에러가 발생했을때 이벤트 처리 함수. on은 error가 발생할때마다 함수를 실행
db.on("error", (error) => console.log("DB Error", error));
//DB에 연결되었을때 이벤트 처리 함수. once는 맨 처음의 이벤트 발생에만 발동
db.once("open", handleOpen);
