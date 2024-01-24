module.exports = app => {
  const record = require("../controllers/record.controller")
  var router = require("express").Router();

  //create record
  router.post("/", record.create);

  //get record
  router.get("/", record.findAll);

  //update record
  router.put("/:id", record.update);

  //delete record
  router.delete("/:id", record.delete);


  app.use('/api/record', router);

}