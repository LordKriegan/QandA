module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING
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