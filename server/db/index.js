require('custom-env').env(true)
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mvp', process.env.DB_USER, 'postgres', {
  host: process.env.DB_HOST,
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