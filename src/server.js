import express from "express";

const PORT = 4000;

//express 어플리케이션 생성
const app = express();

const handleListening = () => console.log("Server listening on port 4000");

app.listen(PORT, handleListening);
