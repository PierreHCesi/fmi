/** 
 * @swagger 
 * tags: 
 *   - name: Persons 
 *     description: Is the service of Persons 
 */

/**
* @swagger
* definitions:
*   Persons:
*     properties:
*       id:
*           type: integer
*       name:
*           type: string
*       role:
*           type: string
*       number:
*           type: integer
*       poste:
*           type: string
*       club_id:
*           type: integer
*       country_id:
*           type: integer
*      
*/
module.exports = (app, authenticateJWT) => {
    const persons = require("../controllers/person.js");

    var router = require("express").Router();

    /** 
    * @swagger 
    * /api/v1/persons: 
    *   get: 
    *     description: | 
    *       The service will offer a person endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of persons. 
    *     tags: 
    *       - Persons 
    *     produces: 
    *       - application/json 
    *     responses: 
    *       200: 
    *         description: OK 
    *         schema:
    *           $ref: '#/definitions/Persons'
    */
    router.get("/", persons.getAllPersons);

    /**
    * @swagger
    * /api/v1/persons/arbiter:
    *   get: 
    *     description: | 
    *       The service will offer a arbiter endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of all arbiter. 
    *     tags: 
    *       - Persons 
    *     produces: 
    *       - application/json 
    *     responses: 
    *       200: 
    *         description: OK 
    *         schema:
    *           $ref: '#/definitions/Persons'
    */
    router.get("/arbiter", persons.getAllArbiters);

    /**
    * @swagger
    * /api/v1/persons/player/club/{id}:
    *   get: 
    *     description: | 
    *       The service will offer a player endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of player from club. 
    *     tags: 
    *       - Persons 
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Club id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: OK 
    *         schema:
    *           $ref: '#/definitions/Persons'
    */
    router.get("/player/club/:id", persons.getAllPlayersWithClubId);

    /**
    * @swagger
    * /api/v1/persons/staff/club/{id}:
    *   get: 
    *     description: | 
    *       The service will offer a staff endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of staff from club. 
    *     tags: 
    *       - Persons 
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Club id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: OK 
    *         schema:
    *           $ref: '#/definitions/Persons'
    */
    router.get("/staff/club/:id", persons.getAllStaffsWithClubId);

    app.use('/api/v1/persons', router);
};