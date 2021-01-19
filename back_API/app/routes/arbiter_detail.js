/** 
* @swagger 
* tags: 
*   - name: Arbiter 
*     description: Is the service of Arbiter
*/

/**
* @swagger
* definitions:
*   Arbiter:
*     type: object
*     properties:
*       person_id:
*           type: integer
*       match_sheet_id:
*           type: integer
*       type:
*           type: string
*/
module.exports = (app, authenticateJWT) => {
    const arbiter = require("../controllers/arbiter_detail.js");

    var router = require("express").Router();

    /** 
    * @swagger 
    * /api/v1/matchsheet/{id}/arbiter: 
    *   get: 
    *     description: | 
    *       The service will offer a arbiter of Match sheet endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of arbiter. 
    *     tags: 
    *       - Arbiter 
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Arbiter of match sheet id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: OK 
    */
    router.get("/:id/arbiter", arbiter.getAllArbiterOfMatchSheet);

    /** 
    * @swagger 
    * /api/v1/matchsheet/arbiter/create: 
    *   post: 
    *     tags: 
    *       - Arbiter 
    *     description: Create new Arbiter of Match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: arbiter
    *         description: Arbiter object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Arbiter'
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Arbiter'
    *     responses: 
    *       200: 
    *         description: Successfully created 
    */
    router.post("/arbiter/create", authenticateJWT, arbiter.create);

    /** 
    * @swagger 
    * /api/v1/matchsheet/arbiter/edit/{id}: 
    *   put: 
    *     tags: 
    *       - Arbiter 
    *     description: Edit an Arbiter
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Arbiter of match sheet id
    *         in: path
    *         required: true
    *         type: integer
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Arbiter'
    *     responses: 
    *       200: 
    *         description: Successfully edited 
    */
    router.put("/arbiter/edit/:id", authenticateJWT, arbiter.edit);

    /** 
    * @swagger 
    * /api/v1/matchsheet/arbiter/delete/{id}: 
    *   delete: 
    *     tags: 
    *       - Arbiter 
    *     description: Delete an Arbiter of match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Arbiter id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: Successfully deleted 
    */
    router.delete("/arbiter/delete/:id", authenticateJWT, arbiter.delete);

    app.use('/api/v1/matchsheet', router);
};