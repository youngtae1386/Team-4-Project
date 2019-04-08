/* eslint-disable camelcase */
/* eslint-disable indent */
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define("product", {
    prod_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    cat_id: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.DECIMAL
  });
  return product;
};
