import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { prisma } from "../db/prisma";


interface DecodedToken {
  userId: string;
}

export function authMiddleware(permissions?: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({message: "Token não fornecido"})
    }

    const token = authHeader.substring(7);

    try {
      const MY_SECRET_KEY = process.env.MY_SECRET_KEY

      if(!MY_SECRET_KEY) {
        throw new Error("Chave secreta não fonercida")
      }

      const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken

      request.user = {id:  decodedToken.userId}

      if(permissions) {
        const user = await prisma.user.findUnique({
          where: {
            id: decodedToken.userId
          },
          include: {
            userAccess: {
              select: {
                Access: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        });
        
        const userPermissions = user?.userAccess.map((na) => na.Access?.name) ?? []
        const hasPermission = permissions.some((p) => userPermissions.includes(p))

        if(!hasPermission) {
          return response.status(403).json({message: "Permissão negada."})
        }
      }

      return next()

    } catch (error) {
      return response.status(401).json({message: "Token invalido."})
    }
  }
}