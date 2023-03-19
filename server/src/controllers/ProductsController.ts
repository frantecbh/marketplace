import { Request, Response } from "express";
import { prisma } from "../db/prisma";




export const createProductsController = async (request:Request, response: Response) => {


  const {name, price, ammount } = request.body
  const {storeId} = request.params

  const productAlreadyExists = await prisma.product.findFirst({
    where: {
      name: {
          equals: name,

      }
   }
  })

  if(productAlreadyExists){
    throw new Error("Acesso ja cadastrado");
  }


  const product = await prisma.product.create({
    data:{
      name,
      price,
      ammount,
      Store:{
        connect:{ id: storeId}
      }
     
    }
  })

  return response.json(product)




  
}


export const listAllProductsController = async (request:Request, response: Response) => {

  const access = await prisma.access.findMany()

  return response.json(access)
}