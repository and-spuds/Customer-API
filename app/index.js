const Sequelize = require("sequelize");
const data = require("./dummyData.json");

/* istanbul ignore next */

const sequelize = new Sequelize(null, null, null, {
  host: "localhost",
  dialect: "sqlite",
  operatorsAliases: false,
  storage: "database.sqlite"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.log("Unable to connect to the database", err);
  });

const Customer = sequelize.define(
  "customer",
  {
    customerID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    flights: {
      type: Sequelize.STRING
    },
    emailAddress: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

Customer.sync({ force: true }).then(() => {
  return Customer.bulkCreate(data);
});
