import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const userRoute = Router();
const prisma = new PrismaClient();


// Busca por produtos
userRoute.get("/getall", async (req, res) => {
  const getAll = await prisma.user.findMany();

  res.json(getAll);
});


// Registrar um produto
userRoute.post("/cadastrar", async (req, res) => {
  const { produto, quantidade, valor } = req.body;

  const createUser = await prisma.user.create({
    data: {
      produto,
      quantidade,
      valor
    },
  });

  res.json(createUser);
});

// deletar um produto
userRoute.delete("/deletar/:id", async (req, res) => {
  const { id } = req.params;

  const userExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userExist)
    return res.status(400).json({ error: true, message: "Usuário não existe" });

  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  res.json(deleteUser);
});

  userRoute.get("/", async (req, res) => {
    const getAll = await prisma.user.findMany();
  
    res.json(getAll);
  });

  

export { userRoute };
