/*  Archivo para la configuracion de la base de datos */
import mongoose from "mongoose";
const connectionMongo = async () => {
  await mongoose.connect(process.env.CONEXION_DB, {});
  try {
    console.log("conexion exitosa con la base de datos");
  } catch (error) {
    console.error("Error de conexion:", error.message);
  }
};
export default connectionMongo;
