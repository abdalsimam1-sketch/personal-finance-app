import jwt from "jsonwebtoken";

export const generateTokens = ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  const payload = { id, email };

  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET as string, {
    expiresIn: process.env.ACCESS_LIFETIME as any,
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET as string, {
    expiresIn: process.env.REFRESH_LIFETIME as any,
  });

  return { accessToken, refreshToken };
};
