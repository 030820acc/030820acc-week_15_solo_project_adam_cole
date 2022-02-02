## AirDnD
AirDnD is an Airbnb clone using React and Express. It has a reviews and locations as its 2 full CRUD features 
***
## Technology used
Javascript
React
Redux
Express
CSS
Heroku
Sequelize
PostgreSQL

***
## Live link to heroku
https://airdnd-w15-soloproject.herokuapp.com/

***
## Local startup instructions

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/030820acc/QuestKeeper.git
   ```

2. Install dependencies

      ```bash
      npm install
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Using Sequelize, migrate your database, seed your database

   ```bash
   npx sequelize-cli db:migrate
   ```

   ```bash
   npx sequelize-cli db:seed:all
   ```


6. To run the React App in development,

  ```bash
  npm start
  ```

***
