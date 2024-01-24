module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("language", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};
