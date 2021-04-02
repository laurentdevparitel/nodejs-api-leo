module.exports = app => {

    const employeeController = require("../controllers/employee.controller.js");

    const router = require("express").Router();

    // Create new
    router.post("/", employeeController.create);

    // Retrieve all
    router.get("/", employeeController.findAll);

    // Retrieve all published (filters ...)
    router.get("/published", employeeController.findAllPublished);

    // Retrieve a single with id
    router.get("/:id", employeeController.find);

    // Update with id
    router.put("/:id", employeeController.update);

    // Delete with id
    router.delete("/:id", employeeController.delete);

    // Delete all
    router.delete("/", employeeController.deleteAll);

    app.use(`/${global.gConfig.base_api_url}/employees`, router);
};