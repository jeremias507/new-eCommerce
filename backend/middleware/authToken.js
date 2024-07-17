import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({
          message: "No token, authorization denied",
          error: true,
          succes: false,
        });
    }
    jwt.verify(token, "1234eersd", (error, user) => {
        if (error) {
          return res.status(401).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      data: [],
      error: true,
      succes: false,
    });
  }
};
