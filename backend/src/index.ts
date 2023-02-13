import express from "express";
import {router} from "./routes/routes"  
const app = express();
const PUERTO = process.env.PORT || 3000;
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(PUERTO, () => console.log(`Server on Port ${PUERTO}`));