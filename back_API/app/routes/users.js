/** 
 * @swagger 
 * tags: 
 *   - name: Users 
 *     description: Is the service of Users 
 */

/**
* @swagger
* definitions:
*   Users:
*     type: object
*     properties:
*       id:
*           type: integer
*       username:
*           type: string
*       password:
*           type: string
*       role:
*           type: string
*           enum: [ADMIN, USER]
*       club_id:
*           type: integer
*      
*/
module.exports = app => {
    const users = require("../controllers/users.js");

    var router = require("express").Router();

    /** 
    * @swagger 
    * /api/v1/users: 
    *   post: 
    *     tags: 
    *       - Users 
    *     description: Create new player of Match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: user
    *         description: Users object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Users'
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Users'
    *     responses: 
    *       200: 
    *         description: OK 
    */
    router.post("/", users.login);

    app.use('/api/v1/users', router);
};