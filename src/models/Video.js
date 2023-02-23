//모델: DB의 구조에 대해 알려주는 역할. 여기선 video가 어떤 데이터를 갖고 어떤 형식을 갖는지 서술
//데이터의 모양을 보통 schema라고 정의함
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
