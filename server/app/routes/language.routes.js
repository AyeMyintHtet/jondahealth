module.exports = app => {
  const languages = require("../controllers/languages.controller.js")
  var router = require("express").Router();

  //create lang
  router.post("/", languages.create);

  router.get("/", languages.findAll);



  app.use('/api/language', router);

}