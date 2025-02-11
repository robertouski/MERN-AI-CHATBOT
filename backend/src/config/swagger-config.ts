import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN AI - API Documentation',
      version: '1.0.0',
      description: 'Chat & User documentation API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
