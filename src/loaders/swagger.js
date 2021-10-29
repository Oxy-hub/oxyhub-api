const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerInit = () => {
  const options = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Oxyhub Api',
        description: 'Api documentation for Oxyhub project.',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:8000/api/v0',
          description: 'Local development server'
        }
      ]
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  };

  return swaggerJsdoc(options);
};

module.exports = swaggerInit;
