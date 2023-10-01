import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token)
    const decoded = jwt.verify(token, "thisisasecretthing");
    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("No Auth");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(404).send(e);
  }
};

export default auth;
