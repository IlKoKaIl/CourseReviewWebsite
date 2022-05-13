const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "Humera");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
    console.log(error);
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "Humera");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    if (user.Role !== "admin") {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "You are not Admin" });
    console.log(error);
  }
};

module.exports = { auth, authAdmin };
