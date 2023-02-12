export const trending = (req, res) => {
  const videos = [
    {
      title: "Hello1",
      rating: 5,
      comments: 2,
      createdAt: "A",
      views: 59,
      id: 1,
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
      id: 1,
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete");
};

//export default는 하나밖에 export하지 못함
