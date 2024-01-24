module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("record", {
    name: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    pageCount: {
      type: Sequelize.TINYINT
    }
  });

  return Tutorial;
};
