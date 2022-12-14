import { Comments, Consultant, Session, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { IUser } from "../middleware/auth";
import { getCommentsSchemaType, getConsultantSchemaType, getSessionSchemaType ,deleteSessionSchemaType, deleteConsultantSchemaType } from "../zod_schema/user.schema";


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
    const consultants = await prisma.consultant.findMany(
        {
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        } }
        );
    // const username = await prisma.user.findMany();
         return res.status(200).json(consultants);
        //  return res.status(200).json(username);
}

export const getConsultantHandler = async (req: Request, res: Response) => {
    // const user = res.locals.user as Consultant;
    const {user_id} = req.params as getConsultantSchemaType
  
    const consultant = await prisma.consultant.findMany({
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

  


export const addComments = async (req: Request, res: Response) => {
    const newComment = req.body as Comments;
  
    try {
      await prisma.comments.create({
        data: newComment,
      });
      res.status(201).json({
        message: 'New Comments !',
      });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      res.status(400).json({
        message: prismaError.message,
      });
    }
  };
  
  
  export const getCommentsHandler = async (req: Request, res: Response) => {
    const {id} = req.params as getCommentsSchemaType
    
    const Comments = await prisma.comments.findMany({
        where: {id: id}
       
    })
    return res.status(200).json(Comments);
  };


  export const deleteSessionHandler = async (req: Request, res: Response) => {
    const user = res.locals.user as IUser;
    const { id } = req.params as deleteSessionSchemaType;
  
    const deleteCount = await prisma.session.deleteMany({
      where: {
        id: id
      },
    });
    if (deleteCount.count == 0) {
      return res.status(400).json({
        message: 'Invalid session id',
      });
    }
    return res.status(200).json({
      message: 'Session deleted !',
    });
  };

  export const deleteConsultantHandler = async (req: Request, res: Response) => {
    const user = res.locals.user as IUser;
    const { id } = req.params as deleteConsultantSchemaType;
  
    const deleteCount = await prisma.session.deleteMany({
      where: {
        id: id
      },
    });
    if (deleteCount.count == 0) {
      return res.status(400).json({
        message: 'Invalid session id',
      });
    }
    return res.status(200).json({
      message: 'Session deleted !',
    });
  };