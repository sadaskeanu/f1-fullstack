import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "F1 API",
      version: "1.0.0",
      description: "API docs for F1 backend",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts", "./src/docs/schemas.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
