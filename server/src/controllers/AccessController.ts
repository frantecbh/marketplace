import { Request, Response } from "express";
import { prisma } from "../db/prisma";




export const createAccessController = async (request:Request, response: Response) => {


  const {name } = request.body

  const accessAlreadyExists = await prisma.user.findFirst({
    where: {
      name: {
          equals: name,

      }
   }
  })

  if(accessAlreadyExists){
    throw new Error("Acesso ja cadastrado");
  }


  const access = await prisma.access.create({
    data:{
      name,
     
    }
  })

  return response.json(access)




  
}


export const listAllAccessController = async (request:Request, response: Response) => {

  const access = await prisma.access.findMany()

  return response.json(access)
}