/*  archhivo general para el backeend */
// importaciones
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectionMongo from "./config/db.js";
// Importar los modelos
import { userModel } from "./models/user.model.js";
import { teacherModel } from "./models/teacher.model.js";
import { memberModel } from "./models/member.model.js";
import { courseModel } from "./models/course.model.js";
import { activityLeaderModel } from "./models/activityLeader.model.js";
import { activityModel } from "./models/activity.model.js";
//importar rutas
import { createRoutesForModel } from "./routers/routers.js";
import { loginRouter } from "./routers/login.routers.js";
//importar el amnejador de errores
import { errorHandler } from "./middleware/errorHandle.js";

// importar la documentacion de la API
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger.js";

//  configuracion del servidor
const app = express();
dotenv.config();

// coneccion a la base de datos
connectionMongo();

// llamado al midleware
app.use(express.json());

app.use(cors()); // configura el servidor para que acepte peticiones desde un navegador

// create las rutas para los modelos especificos
createRoutesForModel(userModel, "users", app, true);
createRoutesForModel(teacherModel, "teachers", app);
createRoutesForModel(memberModel, "members", app);
createRoutesForModel(courseModel, "courses", app);
createRoutesForModel(activityLeaderModel, "activityLeaders", app);
createRoutesForModel(activityModel, "activities", app);

//ruta para el servicio de login
app.use("/login", loginRouter);

// Serve Swagger documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { explorer: true }));

// Middleware de manejo de errores
app.use(errorHandler);

//ejecucion de servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`El puerto se esta escuchando en http://localhost:${port}`);
});
