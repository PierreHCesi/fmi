/** 
* @swagger 
* tags: 
*   - name: Metadata 
*     description: Is the service of Metadata for Matchsheet
*/

/**
* @swagger
* definitions:
*   Metadata:
*     type: object
*     properties:
*       person_id:
*           type: integer
*       match_sheet_id:
*           type: integer
*       key_metadata_field:
*           type: string
*           enum: ['BUT','RED_CARD','INPUT','OUTPUT','YELLOW_CARD']
*       valueTime:
*           type: string
*/
module.exports = (app, authenticateJWT) => {
    const Metadata = require("../controllers/metadata.js");

    var router = require("express").Router();

    /** 
    * @swagger 
    * /api/v1/matchsheet/{id}/metadata: 
    *   get: 
    *     description: | 
    *       The service will offer a Metadata of Match sheet endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and list of Metadata. 
    *     tags: 
    *       - Metadata 
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Metadata of match sheet id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: OK 
    */
    router.get("/:id/metadata", Metadata.getAllMetadataOfMatchSheet);

    /** 
    * @swagger 
    * /api/v1/matchsheet/metadata/create: 
    *   post: 
    *     tags: 
    *       - Metadata 
    *     description: Create new Metadata of Match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: metadata
    *         description: Metadata object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Metadata'
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Metadata'
    *     responses: 
    *       200: 
    *         description: Successfully created 
    */
    router.post("/metadata/create", authenticateJWT, Metadata.create);

    /** 
    * @swagger 
    * /api/v1/matchsheet/metadata/edit/{id}: 
    *   put: 
    *     tags: 
    *       - Metadata 
    *     description: Edit a Metadata
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Metadata of match sheet id
    *         in: path
    *         required: true
    *         type: integer
    *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Metadata'
    *     responses: 
    *       200: 
    *         description: Successfully edited 
    */
    router.put("/metadata/edit/:id", authenticateJWT, Metadata.edit);

    /** 
    * @swagger 
    * /api/v1/matchsheet/metadata/delete/{id}: 
    *   delete: 
    *     tags: 
    *       - Metadata 
    *     description: Delete an Metadata of match sheet
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: id
    *         description: Metadata id
    *         in: path
    *         required: true
    *         type: integer
    *     responses: 
    *       200: 
    *         description: Successfully deleted 
    */
    router.delete("/metadata/delete/:id", authenticateJWT, Metadata.delete);

    app.use('/api/v1/matchsheet', router);
};