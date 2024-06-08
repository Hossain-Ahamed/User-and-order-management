import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { middlewares } from "./middleware/middleware";

const app = express();

//parser
app.use(express.json());
app.use(cors());

/*---------------- MIDDLEWARES -----------------------*/

// app.use(middlewares.logger);


/*------------ APPLICATION ROUTES -------------------*/

/*--------------------------TEST --------------------*/
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello to my user and order management project!");
  } catch (error) {
    next(error);
  }
});

/**------------ GLOBAL ERROR HANDLER -------------------*/
app.use(middlewares.errorHandler);

/** ------------ NOT FOUND URL ------------------- */
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    urlName: req.url,
    message: "URL Not found",
  });
});

export default app;
