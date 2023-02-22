import { Router } from "express";

import { checkToken } from "../utilities/utilities";
import { registerUser, login,upWallet } from "../models/user.model";
import {
  getBookByTittle,
  getAllBooks,
  uploadBook,
  uploadChapter,
  uploadComment,
  voteChapter,
 
} from "../models/book.model";
export const router = Router();

router.get("/", (req, res) => {
  res.send("Bienvenido 2");
});

router.get("/books", getAllBooks);
router.get("/book/:tittle", getBookByTittle);
router.post("/user", registerUser);
router.post("/login", login);
router.post("/book/", checkToken, uploadBook);//subir livro
router.post("/chapter", uploadChapter);
router.post("/comment", uploadComment);
router.post("/vote", voteChapter);
router.post("/wallet", upWallet)

//checktoken para subir book
// router.post("/book", checkToken, createBook)
