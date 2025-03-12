import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// middleware to check if user is logged in
export const authenticateUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // console.log(decoded);

    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

// middleware to check if user is admin
export const authorizeAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admins only" });
    return;
  }

  next();
};
