import { Router } from "express";

import { checkToken } from "../utilities/utilities";
import { registerUser, login } from "../models/user.model";
import {
  getBookByTittle,
  getAllBooks,
  uploadBook,
  uploadChapter,
  uploadComment,
} from "../models/book.model";
export const router = Router();

router.get("/", (req, res) => {
  res.send("Bienvenido 2");
});

router.get("/books", getAllBooks);
router.get("/book/:tittle", getBookByTittle);
router.post("/user", registerUser);
router.post("/login", login);
router.post("/book/", checkToken, uploadBook);
router.post("/chapter", uploadChapter);
router.post("/comment", uploadComment);

//checktoken para subir book
// router.post("/book", checkToken, createBook)
