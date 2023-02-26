//모델: DB의 구조에 대해 알려주는 역할. 여기선 video가 어떤 데이터를 갖고 어떤 형식을 갖는지 서술
//데이터의 모양을 보통 schema라고 정의함
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
