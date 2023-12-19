import * as jose from "jose";

function isValidToken(token) {
  const JWT_KEY = import.meta.env.VITE_JWT_KEY;
  try {
    jose.jwtVerify(token, JWT_KEY);
    return true;
  } catch (error) {
    return;
  }
}

export default isValidToken;
