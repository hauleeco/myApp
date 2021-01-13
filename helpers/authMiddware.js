const jwtHelper = require("./jwt.helper");
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

let isAuth = async (req, res, next) => {
  const tokenFromClient = req.headers["x-access-token"];
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
module.exports = {
  isAuth: isAuth,
};