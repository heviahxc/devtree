import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import   User, {IUser} from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof result === "object" && "payload" in result && "id" in result.payload) {
      const user = await User.findById(result.payload.id).select("-password");

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      req.user = user;
      next();
      return;
    }

    res.status(401).json({ error: "Invalid token" });
  } catch (error) {
    const message =
      error instanceof jwt.JsonWebTokenError
        ? "Invalid token"
        : "Authentication failed";
    res.status(401).json({ error: message });
  }
};