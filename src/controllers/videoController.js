const videos = [
  {
    title: "Hello1",
    rating: 5,
    comments: 2,
    createdAt: "A",
    views: 59,
    id: 0,
  },
  {
    title: "Hello2",
    rating: 5,
    comments: 2,
    createdAt: "2분전",
    views: 59,
    id: 1,
  },
  {
    title: "Hello3",
    rating: 5,
    comments: 2,
    createdAt: "2분전",
    views: 59,
    id: 2,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  return res.render("watch", { pageTitle: `Watch ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = (req, res) => {
  return res.end();
};
//export default는 하나밖에 export하지 못함
