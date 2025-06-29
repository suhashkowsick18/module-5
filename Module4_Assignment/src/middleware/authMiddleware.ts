import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || user.role !== role) {
      res.status(403).json({ message: "Access Denied" });
      return;
    }
    next();
  };
};
