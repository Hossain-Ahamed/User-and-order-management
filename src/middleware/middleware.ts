import express, { NextFunction, Request, Response } from 'express';
import config from '../app/config';


/*------------ Logger -------------------*/
const logger = (req:Request,res:Response, next: NextFunction)=>{
    console.log(`${req.method} ${req.url}`);
    console.log("Cookies : ",req.cookies)
    next();
}

/* ------------ GLOBAL ERROR HANDLER -------------------*/
interface CustomError extends Error {
    statusCode?: number;
  }
  
  const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);
  
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred';
  
    res.status(statusCode).json({
      success: false,
      message: message,
      data: {
        name: error.name,
        message: error.message,
        stack: config.stack === 'production' ? null : error.stack,
      },
    });
  };
  
export const middlewares = {
    logger,
    errorHandler,
}