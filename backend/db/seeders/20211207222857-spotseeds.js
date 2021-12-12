'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
    {
      name: "Rivendell",
      userId: 1,
      photoUrl: 'https://c4.wallpaperflare.com/wallpaper/335/429/69/nature-mountains-the-city-waterfall-the-lord-of-the-rings-hd-wallpaper-preview.jpg',
      description: "Rivendell is the home of the elves and sits in a cozy valley. Checkout is 11AM. NO DOGS!!"
    },
    {
      name: "Moria",
      userId: 1,
      photoUrl: 'https://cdnb.artstation.com/p/assets/images/images/040/445/069/large/adam-breen-moria-final2.jpg?1628864640',
      description: "Delightful underground getaway!! Pls do not leave any food out there are creatures here you're not in the Shire anymore sweetheart ;)"
    },
    {
      name: "Mordor",
      userId: 2,
      photoUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/9/18/1411053132808/854caf6c-05f6-4ae6-8536-3f8b9aeaaee5-620x372.jpeg?width=445&quality=45&auto=format&fit=max&dpr=2&s=494cbb3a02aeae9731b3f0fe884d5463',
      description: "Not for the faint of heart watch out for the neighbors and do not go out of the house when the giant eye is open. Pets welcome with deposit."
    },
    {
      name: "The Shire",
      userId: 2,
      photoUrl: 'https://dwgyu36up6iuz.cloudfront.net/heru80fdn/image/upload/c_fill,d_placeholder_cntraveler.png,fl_progressive,g_face,h_450,q_80,w_800/v1467328944/cntraveler_visiting-the-shire-by-drone.jpg',
      description: "Quaint. Small town vibes, big city fun. Be sure to checkout the green dragon, the only brew for the brave and true."
    },
    {
      name: "Rohan",
      userId: 1,
      photoUrl: 'https://i1.sndcdn.com/artworks-000121605543-cpdu94-t500x500.jpg',
      description: "Pretty much Wyoming."
    },

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
