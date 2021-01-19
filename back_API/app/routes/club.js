/** 
 * @swagger 
 * tags: 
 *   - name: Clubs 
 *     description: Is the service of Clubs 
 */

module.exports = (app, authenticateJWT) => {
    const clubs = require("../controllers/club.js");

    var router = require("express").Router();

    /** 
    * @swagger 
    * /api/v1/clubs: 
    *   get: 
    *     description: | 
    *       The service will offer a club endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of clubs. 
    *     tags: 
    *       - Clubs 
    *     produces: 
    *       - application/json 
    *     responses: 
    *       200: 
    *         description: OK 
    */
    router.get("/", clubs.getAllClubs);


    /** 
    * @swagger 
    * /api/v1/clubs/{id}/players: 
    *   get: 
    *     description: | 
    *       The service will offer a staffs endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of players. 
    *     tags: 
    *       - Clubs 
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
    */
    router.get("/:id/players", clubs.getAllPlayersWithClubId);

    /** 
    * @swagger 
    * /api/v1/clubs/{id}/staffs: 
    *   get: 
    *     description: | 
    *       The service will offer a club endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of staffs. 
    *     tags: 
    *       - Clubs 
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
    */
    router.get("/:id/staffs", clubs.getAllStaffsWithClubId);


    app.use('/api/v1/clubs', router);
};