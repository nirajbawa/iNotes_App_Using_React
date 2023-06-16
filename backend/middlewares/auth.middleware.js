let jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
  try {
    const token = await req.header("auth-token");
    if (!token) {
      res.status(401).json({ error: "please authenticate using valid token" });
    } else {

      const data = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
      next();
    }
  }
  catch (e) {
    console.log(e);
    res.status(401).json({ error: "please authenticate using valid token" });
  }

};

module.exports = auth;
