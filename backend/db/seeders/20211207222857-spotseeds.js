'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
     {name: "Rivendell",
      userId: 1,
      photoUrl: 'https://static.wikia.nocookie.net/lotr/images/5/53/Rivendell_-_The_Hobbit.PNG/revision/latest?cb=20201223182505',
      description: "Rivendell is the home of the elves and sits in a cozy valley. Checkout is 11AM. NO DOGS!!"},

   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
