/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
var db = require("../models");

module.exports = function(app) {
  app.get("/api/product/:id", function(req, res) {
    db.product.findAll({where:{prod_id:req.params.id}}).then(function(products) {
      res.json(products);
    });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function( dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
