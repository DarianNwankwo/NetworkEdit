function willConnectSuccessfully(err) {
  if (err) {
    console.warn(`An Error Has Occurred Connecting To ${process.env.DB_HOST}`, err, '\n');
    throw err;
  }

  console.log("Successfully Connected to Database...");
}

function createUsersTable(connection) {
  connection.connect(willConnectSuccessfully);

  let SQL_CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS Users (
    ID INT NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Age TINYINT NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'),
    YearsOfWorkExperience TINYINT NOT NULL,
    CountriesLivedIn TINYINT NOT NULL,
    NetworkDiversity TINYINT NOT NULL,
    AccessToEliteContacts TINYINT NOT NULL,
    ObligationToNetwork TINYINT NOT NULL,
    NetworkReliabilityForTechnicalAdvice TINYINT NOT NULL,
    NetworkReliabilityForBusinessGuidance TINYINT NOT NULL,
    NetworkReliabilityForFinancialSupport TINYINT NOT NULL,
    PRIMARY KEY (ID)
  );
  `;

  connection.query(SQL_CREATE_TABLE, (err, result) => {
    let database = process.env.DB_DATABASE;
    if (err) {
      console.warn("An Error Has Occurred Trying To Create Table users", err, '\n');
      throw err;
    }

    console.log(`Users Table Successfully Created In Database ${database}...`);
  })
}


module.exports = {
  createUsersTable
}