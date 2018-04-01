import jwt from "jsonwebtoken";
import { secret } from "./config";

const getTokenFromHeader = req => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

export const addUser = async req => {
  const token = getTokenFromHeader(req);
  if (token) {
    try {
      const {user} = await jwt.verify(token, secret);
      req.user = user;
    } catch (err) {
      console.log(err.message);
    }
  }
  req.next();
};
