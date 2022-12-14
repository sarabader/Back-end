import { Consultant, Role, User } from '@prisma/client';
import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config/db';


export const LoginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as User;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: 'كلمة المرور أو البريد الالكتروني  خاطىء',
    });
  }

  const isMatched = await argon2.verify(user.password, password);

  if (!isMatched) {
    return res.status(400).json({
      message: 'كلمة المرور أو البريد الالكتروني  خاطىء',
    });
  }

  const token = jwt.sign(
    { id: user.id},
    process.env.JWT_SECRET as string,

  );

  return res.status(200).json({
    message: '' + user.username + ' مرحبا بك ',
    token,
  });
};



export const RegisterHandler = async (req: Request, res: Response) => {
    try {
      const {username, password, email ,phone, AboutMe, certificate, filed, role} =req.body as Consultant & User;
      const hashedPassword = await argon2.hash(password);
     const user= await prisma.user.create({
        data:{
        username,
        email,
        password:hashedPassword,
        role,      
      },
      })

      if(role==='Consultant'){
  await prisma.consultant.create({
        data:{
          user_id:user.id,
          phone, 
          AboutMe, 
          certificate,
           filed,  
      },
      })
      }else {
        await prisma.investor.create({
          data:{user_id:user.id}
        })
      }
    
   
      return res.status(201).json({
        message:  "تم التسجيل بنجاح !",
      });
    
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Issue with your input' });
    }
  };

  export const ProfileHandler = async (req: Request, res: Response) => {
    try {
      const {username, password, email ,phone, AboutMe, certificate, filed, role} =req.body as Consultant & User;
      const hashedPassword = await argon2.hash(password);
     const user= await prisma.user.create({
        data:{
        username,
        email,
        password:hashedPassword,
        role,      
      },
      })

      if(role==='Consultant'){
  await prisma.consultant.create({
        data:{
          user_id:user.id,
          phone, 
          AboutMe, 
          certificate,
           filed,  
      },
      })
      }else {
        await prisma.investor.create({
          data:{user_id:user.id}
        })
      }
    
   
      return res.status(201).json({
        message:  "تم التسجيل بنجاح !",
      });
    
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Issue with your input' });
    }
  };

  export const deleteHandler = async (req: Request, res: Response) => {
    const { user_id } = req.params as Consultant;

    const deleteCount = await prisma.consultant.deleteMany({
      where: {
        user_id: user_id,
      },
    });

    if (deleteCount.count == 0) {
      return res.status(400).json({
        message: 'Invalid user id',
      });
    }

    return res.status(200).json({
      message: 'user deleted !',
    });
  };