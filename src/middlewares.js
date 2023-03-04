export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  if (req.session.loggedIn) {
    res.locals.loggedIn = true;
  }
  res.locals.loggedInUser = req.session.user;
  next();
};
