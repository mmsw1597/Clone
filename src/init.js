import "dotenv/config";
import "./db";
import Video from "./models/Video";
import User from "./models/User";
import app from "./server";

const PORT = 4000;

//서버를 외부에 개방
const handleListening = () => console.log("Server listening on port 4000");

app.listen(PORT, handleListening);
