module.exports = app => {
  const swaggerUi = require('swagger-ui-express');
  const swaggerJsdoc = require('swagger-jsdoc');

  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger FFF Cesi',
        version: '1.0.0',
      },
    },
    apis: ['app/routes/*.js'],
  };

  const swaggerSpecification = swaggerJsdoc(options);

  app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
};