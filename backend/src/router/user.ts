import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import bcrypt from "bcryptjs";
import { prismaClient } from "../db";


const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs. Please check again.",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User Already Exists",
    });
  }

  await prismaClient.user.create({
    data: {
      fullname:parsedData.data.fullname,
      email: parsedData.data.username,
      password: await bcrypt.hash(parsedData.data.password, 10),
    },
  });

  return res.json({
    message:
      "Please verify your account by clicking on the link in your email.",
  });
});

router.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "The entered details are incorrect. Please verify them again.",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: { email: parsedData.data.username },
  });

  if (
    !user ||
    !(await bcrypt.compare(parsedData.data.password, user.password))
  ) {
    return res.status(403).json({
      message: "Sorry, the entered credentials are incorrect.",
    });
  }

  // Sign in the JWT Token
  const token = jwt.sign({ id: user.id }, JWT_PASSWORD);

  return res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: { id },
    select: {
      fullname: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
