'use strict';
module.exports = (sequelize, DataTypes) => {
  const Niveis = sequelize.define('Niveis', {
    descr_nivel: DataTypes.STRING
  }, {paranoid: true});
  Niveis.associate = function(models) {
    // associations can be defined here
    Niveis.hasMany(models.Turmas, {
      foreignKey: 'nivel_id'
    })
  };
  return Niveis;
};