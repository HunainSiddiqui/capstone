import { prismaClient } from "../db";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware";


const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  const bails = await prismaClient.applicant.findMany();
  res.json(bails);


});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const bail = await prismaClient.applicant.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(bail);
});


router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const body = req.body;
  const { applicantName, email, caseNumber, address, additionalInfo, file} = body;
  const bail = await prismaClient.applicant.create({
    data: {
      applicantName,
      email,
      caseNumber,
      address,
      additionalInfo,
      file,
    },
  });
  res.json(bail);
});
 

export { router as bailRouter };