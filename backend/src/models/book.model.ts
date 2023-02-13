import { Request, Response } from "express";
import { pool } from "../driversDB/db.pg.driver";
import { Book, Book2 } from "../interfaces/Book";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const resultado = await pool.query("SELECT * from books");

    return res.json(resultado.rows);
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};

export const getBookByTittle = async (req: Request, res: Response) => {
  try {
    const title = req.params.tittle;

    const resultado = await pool.query(
      "SELECT * from books where title like $1",
      ["%" + title + "%"]
    );
    if (resultado.rowCount == 0)
      return res.json({ msg: "No existe titulo en la base de datos" });
    return res.json(resultado.rows);
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};
export const uploadBook = async (req: Request, res: Response) => {
  const { title, gener1, gener2, descrip, id_user } = req.body;
  if (title && gener1 && descrip && id_user) {
    try {
      const result = await pool.query(
        "INSERT INTO books(title,gener1,gener2, descrip, id_user, date_public) VALUES($1,$2,$3,$4,$5, current_timestamp) RETURNING *",
        [title, gener1, gener2, descrip, id_user]
      );
      return res.json(result.rows);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  } else {
    return res.status(404).json({ msg: "falta alguna propiedad" });
  }
};

//export const uploadChapter
export const uploadChapter = async (req: Request, res: Response) => {
  const { id_book, chapter_number, chapter_name, content } = req.body;

  if (id_book && chapter_number) {
    try {
      const result = await pool.query(
        "INSERT INTO chapters (id_book, chapter_number, chapter_name, content,publication_date,update_date) values ($1,$2,$3,$4,current_timestamp,current_timestamp) RETURNING *",
        [id_book, chapter_number, chapter_name, content]
      );
      return res.json(result.rows);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  } else {
    return res.status(400).json({ msg: "Faltan datos" });
  }
};

export const uploadComment = async (req: Request, res: Response) => {
  const { id_user, id_book, id_chapter, comment } = req.body;
  if (id_user && id_book && id_chapter && comment) {
    try {
      const result = await pool.query(
        "INSERT INTO comments (id_user, id_book, id_chapter, comment, update_date)" +
          "VALUES ($1,$2,$3,$4, current_timestamp) RETURNING *",
        [id_user, id_book, id_chapter, comment]
      );
      return res.json(result.rows);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  } else {
    return res.status(400).json({ msg: "Faltan datos" });
  }
};
