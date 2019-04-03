/* eslint-disable camelcase */
/* eslint-disable indent */
module.exports = function(sequelize, DataTypes) {
  var product_cat = sequelize.define("product_cat", {
    cat_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    prod_name: DataTypes.STRING
  });
  return product_cat;
};
