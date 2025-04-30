// swagger.js
import dotenv from 'dotenv'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
dotenv.config();

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CFMS",
      version: "V1.0",
      description: "API documentation For Church Finance Management System",
      contact: {
        name: "Adekoya Adegbenga",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`, // ✅ proper server URL
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}',
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            firstname: {
              type: "string",
              description: "User's first name",
            },
            lastname: {
              type: "string",
              description: "User's last name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
            },
            password: {
              type: "string",
              description: "User's password",
            },
          },
          required: ["firstname", "lastname", "email", "password"],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./Routes/AdminRoutes.js",        // ✅ Admin routes with Swagger comments
    "./Routes/OfferingRoutes.js",     // ✅ Offering routes with Swagger comments
    // "./Controllers/**/*.js",          // optional: if you have Swagger docs in controllers
  ], // ✅ fixed path to Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi, swaggerSpec };