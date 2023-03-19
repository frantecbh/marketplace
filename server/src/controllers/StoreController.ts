import { Request, Response } from "express";
import { prisma } from "../db/prisma";




export const createStoreController = async (request: Request, response: Response) => {

  const { name } = request.body
  const { userId } = request.params

  const sotreAlreadyExists = await prisma.store.findUnique({
    where: {
      name
    }
  })

  if (sotreAlreadyExists) {
    throw new Error("Store ja cadastrada");
  }


  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!userAlreadyExists) {
    throw new Error("Usuário não cadastrado");
  }




  const store = await prisma.store.create({
    data: {
      name,
      User: {
        connect: {
          id: userId
        }
      }
    },

  })

  return response.json(store)




}


export const listAllStoreController = async (request: Request, response: Response) => {

  const stores = await prisma.store.findMany({
    select:{
      id: true,
      name: true,
      User:{
        select:{
          id: true,
          name: true
        }
      },
     Product: {
      select:{
        id: true,
        name: true,
        price: true,
        ammount: true
        
      }
     }   
     }
  })

  return response.json(stores)

}