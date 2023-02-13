import { pool } from "../driversDB/db.pg.driver";

require("dotenv").config();
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

export const userExist = async (user: string) => {
  const resp = await pool.query(
    "SELECT nick_name, email from users WHERE nick_name = $1 OR email = $1",
    [user]
  );

  return resp.rows.length == 0 ? false : true;
};
export function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = `${authHeader.split(" ")[1]}`;

    try {
      const secret = `${process.env.secret}`;

      const verificado = jwt.verify(token, secret);
      console.log("---------------");
      console.log(verificado);
      console.log("---------------");

      next();
    } catch (error) {
      res.status(400).json({ msg: `Token invalido o caducado ${error}` });
    }
  }
}
