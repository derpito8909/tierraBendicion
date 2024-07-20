/*  archhivo general para el backeend */
// importaciones
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectionMongo from "./config/db.js";

//  configuracion del servidor
const app = express();
dotenv.config();
const port = process.env.PORT;

// coneccion a la base de datos
connectionMongo();

// llamado al midleware
app.use(express.json());
app.use(cors()); // configura el servidor para que acepte peticiones desde un navegador

//ejecucion de servidor
app.listen(port, () => {
  console.log(`el servidor se esta escuchando en: http:// localhost:${port}`);
});
