module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answered: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        asker: {
            type: DataTypes.STRING,
            defaultValue: "Anonymous"
        }
    }); 
    return Question; 
  };