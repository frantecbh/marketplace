import { Request, Response } from "express";
import { prisma } from "../db/prisma";

import { hash } from 'bcrypt'


export const createUserController = async (request:Request, response: Response) => {

  const {name, email, password} = request.body

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      email: {
          equals: email,

      }
   }
  })

  if(userAlreadyExists){
    throw new Error("Usuário ja cadastrado");
    
  }
  const hadhPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data:{
      name,
      email,
      password: hadhPassword
    }
  })

  return response.json(user)



  
}