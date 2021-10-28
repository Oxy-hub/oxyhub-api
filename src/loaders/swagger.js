const swaggerJsdoc = require('swagger-jsdoc');

const swaggerInit = () => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Oxyhub Api',
        description: 'Api documentation for Oxyhub project.',
        version: '0.0.0'
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Local development server'
        }
      ]
    },
    apis: ['./src/routes*.js']
  };

  return swaggerJsdoc(options);
};

module.exports = swaggerInit;
