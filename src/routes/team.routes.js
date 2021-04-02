module.exports = app => {

    const teamController = require("../controllers/team.controller.js");

    const router = require("express").Router();

    // Create new
    router.post("/", teamController.create);

    // Retrieve all
    router.get("/", teamController.findAll);

    // Retrieve all published (filters ...)
    router.get("/published", teamController.findAllPublished);

    // Retrieve a single with id
    router.get("/:id", teamController.find);

    // Update with id
    router.put("/:id", teamController.update);

    // Delete with id
    router.delete("/:id", teamController.delete);

    // Delete all
    router.delete("/", teamController.deleteAll);

    app.use(`/${global.gConfig.base_api_url}/teams`, router);
};