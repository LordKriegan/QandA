'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Question', [
      {
        question: "What is the answer to life, universe, and everything?",
        asker: "AnonBot"
      },
      {
        question: "Why does it sound like the devil is laughing, leaving me haunted tonight??",
      },
      {
        question: "Are we there yet???",
        asker: "MQNeill"
      },
      {
        question: "CAN I HAZ COOKIE?",
        asker: "Mr. T"
      },      
      {
        question: "Hidey Hey!",
        asker: "Hidey Ho!"
      },
      {
        question: "Take me down to the paradise city where the grass is green and the girls are pretty! Oh wont you please take me home???",
        asker: "Guns N' Roses"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Question', null, {});
  }
};
