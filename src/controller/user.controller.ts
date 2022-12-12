import { Consultant, Session, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { getConsultantSchemaType, getSessionSchemaType } from "../zod_schema/user.schema";



  export const addSession = async (req: Request, res: Response) => {
    const newSession = req.body as Session;
  
    try {
      await prisma.session.create({
        data: newSession,
      });
      res.status(201).json({
        message: 'New Session created !',
      });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      res.status(400).json({
        message: prismaError.message,
      });
    }
  };
  


export const getAllConsultantHandler = async (req: Request, res: Response) => {
    const consultants = await prisma.consultant.findMany({
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
    // const username = await prisma.user.findMany();
         return res.status(200).json(consultants);
        //  return res.status(200).json(username);
}

export const getConsultantHandler = async (req: Request, res: Response) => {
    // const user = res.locals.user as Consultant;
    const {user_id} = req.params as getConsultantSchemaType
  
    const consultant = await prisma.consultant.findUnique({
        where: { user_id: user_id},
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    })
    return res.status(200).json(consultant);
  };
  
  export const getSessionHandler = async (req: Request, res: Response) => {
    // const user = res.locals.user as Consultant;
    const {investor_id} = req.params as getSessionSchemaType
  
    const session = await prisma.consultant.findUnique({
        where: { user_id: investor_id},
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    })
    return res.status(200).json(session);
  };

