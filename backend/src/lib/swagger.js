import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Tierra de bendicion",
    version: "1.0.0",
    description: "back end tierra de bendicion",
  },
};
const options = {
  swaggerDefinition,
  apis: ["../routers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
