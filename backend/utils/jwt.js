import jwt from "jsonwebtoken";

export const createAccesToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "1234eersd", { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token)
    });
  });
};



