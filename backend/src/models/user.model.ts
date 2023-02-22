import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();
import { pool } from "../driversDB/db.pg.driver";

import { User } from "../interfaces/user";
import { userExist } from "../utilities/utilities";

const KEY = process.env.SECRET;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body; //provando uso duma interface

    const salt = await bcrypt.genSalt(12);
    const passwordEnc = await bcrypt.hash(user.password, salt);
    user.password = passwordEnc;

    const result = await pool.query(
      "INSERT INTO users (dni, name1, name2, last_name1, last_name2,nick_name, email, date_birth, address, country, password,date_register ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,current_timestamp) Returning *",
      [
        user.dni,
        user.name1,
        user.name2,
        user.last_name1,
        user.last_name2,
        user.nick_name,
        user.email,
        user.date_birth,
        user.address,
        user.country,
        user.password,
      ]
    );
    return res.json(result.rows);

    //console.log(user.dni);
  } catch (error) {
    return res.json({ msg: `${error}` });
  }
};

export const login = async (req: Request, res: Response) => {
  const { user, pass } = req.body;
  if (!(await userExist(user))) {
    return res.json({ msg: `${user} Don't exist` });
  }

  const passEncr = await pool.query(
    "SELECT password FROM users WHERE email =$1 OR nick_name = $1",
    [user]
  );

  const checkPass = await bcrypt.compare(pass, passEncr.rows[0].password);

  //console.log(checkPass);
  if (checkPass) {
    const token = jwt.sign(
      {
        name: user,
      },
      `${KEY}`,
      { expiresIn: 3600 }
    );

    res.json({
      name: user,
      token: token,
      message: "Contraseña valida",
    });
  } else {
    return res.json({
      name: user,
      token: "invalido",
      message: "Contraseña Invalida",
    });
  }
};

export const upWallet = async (req:Request, res:Response) => {
  const {id_user, wallet, user_wallet_name, user_wallet_other_data}= req.body;
  if(id_user && wallet && user_wallet_name){
    try {
      const result = await pool.query("INSERT INTO wallets (id_user, wallet, user_wallet_name, user_wallet_other_data) values ($1,$2,$3,$4) Returning *",
      [id_user, wallet, user_wallet_name, user_wallet_other_data]);
      return res.json(result.rows);
    } catch (error) {
      return res.status(400).json({ message: `${error}`})
    }
  }else{
    return res.status(400).json({ msg: "Faltan datos" });
  }
  
}