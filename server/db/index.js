const Sequelize = require('sequelize');

const sequelize = new Sequelize('mvp', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync();

module.exports = sequelize;