/** 
* @swagger 
* tags: 
*   - name: Player_detail 
*     description: Is the service of player detail
*/

/**
* @swagger
* definitions:
*   Player_detail:
*     type: object
*     properties:
*       person_id:
*           type: integer
*       match_sheet_id:
*           type: integer
*       position:
*           type: string
*           enum: ['AVANT','AILIER','MILIEU_OFF','MILIEU','MILIEU_DEF','ARRIERE','GARDIEN']
*       placement:
*           type: string
*           enum: [GAUCHE, CENTRE, DROIT]
*       is_captain:
*           type: integer
*       is_second_captain:
*           type: integer
*       is_spare:
*           type: integer
*/
module.exports = (app, authenticateJWT) => {
    const player_detail = require("../controllers/player_detail.js");

    var router = require("express").Router();

    /** 
    * @swagger 
    * /api/v1/matchsheet/{id}/player: 
    *   get: 
    *     description: | 
    *       The service will offer a Player_detail of Match sheet endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of Player_detail. 
    *     tags: 
    *       - Player_detail 
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Player_detail of match sheet id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: OK 
    */
    router.get("/:id/player", player_detail.getAllPlayerOfMatchSheet);

    /** 
* @swagger 
* /api/v1/matchsheet/{id}/player/visitor: 
*   get: 
*     description: | 
*       The service will offer a Player_detail of Match sheet endpoint which can be accessed via a HTTP GET request. 
*       It will return a status 200 and list of visitor player . 
*     tags: 
*       - Player_detail 
*     produces: 
*       - application/json 
*     parameters:
*       - name: id
*         description: Player_detail of match sheet id
*         in: path
*         required: true
*         type: integer
*     responses: 
*       200: 
*         description: OK 
*/
    router.get("/:id/player/visitor", player_detail.getAllPlayerVisitorOfMatchSheet);

    /** 
 * @swagger 
 * /api/v1/matchsheet/{id}/player/home: 
 *   get: 
 *     description: | 
 *       The service will offer a Player_detail of Match sheet endpoint which can be accessed via a HTTP GET request. 
 *       It will return a status 200 and list of home player. 
 *     tags: 
 *       - Player_detail 
 *     produces: 
 *       - application/json 
 *     parameters:
 *       - name: id
 *         description: Player_detail of match sheet id
 *         in: path
 *         required: true
 *         type: integer
 *     responses: 
 *       200: 
 *         description: OK 
 */
    router.get("/:id/player/home", player_detail.getAllPlayerHomeOfMatchSheet);

    /** 
    * @swagger 
    * /api/v1/matchsheet/player/create: 
    *   post: 
    *     tags: 
    *       - Player_detail 
    *     description: Create new player of Match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: player
    *         description: Player_detail object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Player_detail'
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Player_detail'
    *     responses: 
    *       200: 
    *         description: Successfully created 
    */
    router.post("/player/create", authenticateJWT, player_detail.create);

    /** 
    * @swagger 
    * /api/v1/matchsheet/player/edit/{id}: 
    *   put: 
    *     tags: 
    *       - Player_detail 
    *     description: Edit a Player
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Player_detail of match sheet id
    *         in: path
    *         required: true
    *         type: integer
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Player_detail'
    *     responses: 
    *       200: 
    *         description: Successfully edited 
    */
    router.put("/player/edit/:id", authenticateJWT, player_detail.edit);

    /** 
    * @swagger 
    * /api/v1/matchsheet/player/delete/{id}: 
    *   delete: 
    *     tags: 
    *       - Player_detail 
    *     description: Delete an Player_detail of match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Player_detail id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: Successfully deleted 
    */
    router.delete("/player/delete/:id", authenticateJWT, player_detail.delete);

    app.use('/api/v1/matchsheet', router);
};