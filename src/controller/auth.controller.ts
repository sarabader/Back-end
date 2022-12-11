    import { Consultant, User } from '@prisma/client';
import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config/db';


export const ConsultantLoginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as Consultant;

  const user = await prisma.consultant.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Wrong Email or Password !',
    });
  }

  const isMatched = await argon2.verify(user.password, password);

  if (!isMatched) {
    return res.status(400).json({
      message: 'Wrong Email or Password !',
    });
  }

  const token = jwt.sign(
    { id: user.id},
    process.env.JWT_SECRET as string,
    
  );

  return res.status(200).json({
    message: 'Welcome back ' + user.name + ' !',
    token,
  });
};


export const UserLoginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as User;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Wrong Email or Password !',
    });
  }

  const isMatched = await argon2.verify(user.password, password);

  if (!isMatched) {
    return res.status(400).json({
      message: 'Wrong Email or Password !',
    });
  }

  const token = jwt.sign(
    { id: user.id},
    process.env.JWT_SECRET as string,

  );

  return res.status(200).json({
    message: 'Welcome back ' + user.name + ' !',
    token,
  });
};



export const userRegisterHandler = async (req: Request, res: Response) => {
  try {
    const {name, password, email} = req.body as User;
    const hashedPassword = await argon2.hash(password);


    await prisma.user.create({
      data:{
          name,
          password: hashedPassword,
          email,

      },
    });

    return res.status(201).json({
      message:  "تم التسجيل بنجاح !",
    });
  } catch (error) {
    return res.status(400).json({ message: 'Issue with your input' });
  }
};

export const ConsultantRegisterHandler = async (req: Request, res: Response) => {
    try {
      const {name, password, email ,phone, AboutMe, certificate, filed} =req.body as Consultant & User;
      const hashedPassword = await argon2.hash(password);
  

      await prisma.consultant.create({
          data:{
            name,
            password: hashedPassword,
            email,
            phone,
            AboutMe, 
            certificate,
            filed,
            
                
        },
      });
  
      return res.status(201).json({
        message:  "تم التسجيل بنجاح !",
      });
    } catch (error) {
      return res.status(400).json({ message: 'Issue with your input' });
    }
  };

