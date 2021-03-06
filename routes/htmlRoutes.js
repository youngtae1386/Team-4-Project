var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({raw: true}).then(function(dbExamples) {
  //     var uniqueKeys = dbExamples.reduce(function(acc, obj){
  //       return acc.concat(Object.keys(obj).filter(key=>acc.indexOf(key) === -1));
  //     },[]);
  //     res.render("index", {
  //       msg: "Welcome!",
  //       uniqueKeys: uniqueKeys,
  //       data: dbExamples
  //     });
  //   });

  // });

  app.get("/", function(req, res) {
    db.Example.findAll({ raw: true }).then(function(dbExamples) {
      // var uniqueKeys = dbExamples.reduce(function(acc, obj){
      //   return acc.concat(Object.keys(obj).filter(key => acc.indexOf(key) === -1));
      // },[]);
      res.render("index", {
        msg: "Welcome!",
        // uniqueKeys: uniqueKeys,
        data: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
