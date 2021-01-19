/** 
* @swagger 
* tags: 
*   - name: Match 
*     description: Is the service of Match sheet 
*/

/**
* @swagger
* definitions:
*   Match:
*     type: object
*     properties:
*       home_club_id:
*           type: integer
*       visitor_club_id:
*           type: integer
*       status:
*           type: string
*       candidate_home:
*           type: integer
*       candidate_visitor:
*           type: interger
*       date:
*           type: string
*           format: date-time
*/
module.exports = (app, authenticateJWT) => {
   const match = require("../controllers/match_sheet.js");

   var router = require("express").Router();

   /** 
   * @swagger 
   * /api/v1/matchsheet: 
   *   get: 
   *     description: | 
   *       The service will offer a Match endpoint which can be accessed via a HTTP GET request. 
   *       It will return a status 200 and list of matchsheet. 
   *     tags: 
   *       - Match 
   *     produces: 
   *       - application/json 
   *     responses: 
   *       200: 
   *         description: OK 
   */
   router.get("/", match.getAllMatchSheet);

   /** 
* @swagger 
* /api/v1/matchsheet/clubs: 
*   get: 
*     description: | 
*       The service will offer a Match endpoint which can be accessed via a HTTP GET request. 
*       It will return a status 200 and list of matchsheet with clubs. 
*     tags: 
*       - Match 
*     produces: 
*       - application/json 
*     responses: 
*       200: 
*         description: OK 
*/
   router.get("/clubs", match.getAllMatchSheetWithClubs);

   /** 
* @swagger 
* /api/v1/matchsheet/inprogress/{id}: 
*   get: 
*     description: | 
*       The service will offer a Match endpoint which can be accessed via a HTTP GET request. 
*       It will return a status 200 and list of matchsheet with clubs. 
*     tags: 
*       - Match 
*     produces: 
*       - application/json 
*     parameters:
*       - name: id
*         description: club id
*         in: path
*         required: true
*         type: integer
*     responses: 
*       200: 
*         description: OK 
*/
   router.get("/inprogress/:id", match.getMatchSheetInProgressWithClubId);

   /** 
   * @swagger 
   * /api/v1/matchsheet/create: 
   *   post: 
   *     tags: 
   *       - Match 
   *     description: Create new Match Sheet
   *     produces: 
   *       - application/json 
   *     parameters:
   *       - name: match
   *         description: Match Sheet object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Match'
   *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Match'
   *     responses: 
   *       200: 
   *         description: Successfully created 
   */
   router.post("/create", authenticateJWT, match.create);

   /** 
   * @swagger 
   * /api/v1/matchsheet/edit/{id}: 
   *   put: 
   *     tags: 
   *       - Match 
   *     description: Edit a Match Sheet
   *     produces: 
   *       - application/json 
   *     parameters:
   *       - name: id
   *         description: Match Sheet id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: body
   *         description: Match Sheet object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Match'
   *     requestBody:
    *         content:
    *            application/x-www-form-urlencoded:
    *               schema:
    *                   $ref: '#/definitions/Match'
   *     responses: 
   *       200: 
   *         description: Successfully edited 
   */
   router.put("/edit/:id", authenticateJWT, match.edit);


   router.put("/edit/candidate/home/:id", authenticateJWT, match.editCandidateHome);
   router.put("/edit/candidate/visitor/:id", authenticateJWT, match.editCandidateVisitor);

   /** 
   * @swagger 
   * /api/v1/matchsheet/delete/{id}: 
   *   delete: 
   *     tags: 
   *       - Match 
   *     description: Delete a Match Sheet
   *     produces: 
   *       - application/json 
   *     parameters:
   *       - name: id
   *         description: Match Sheet id
   *         in: path
   *         required: true
   *         type: integer
   *     responses: 
   *       200: 
   *         description: Successfully deleted 
   */
   router.delete("/delete/:id", authenticateJWT, match.delete);

   app.use('/api/v1/matchsheet', router);
};