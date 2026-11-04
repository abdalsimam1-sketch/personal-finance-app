import jwt from "jsonwebtoken";

export const generateJWT = (payload: { id: string; email: string }) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET as any, {
    expiresIn: process.env.ACCESS_LIFETIME as any,
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET as any, {
    expiresIn: process.env.REFRESH_LIFETIME as any,
  });

  return { accessToken, refreshToken };
};
