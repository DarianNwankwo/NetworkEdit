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
    ID INT NOT NULL AUTO_INCREMENT,
    Fullname VARCHAR(200) NOT NULL,
    Email VARCHAR(320) NOT NULL UNIQUE,
    PasswordHash VARCHAR(64) NOT NULL,
    IsVerified BOOLEAN DEFAULT True,
    Age TINYINT DEFAULT 0,
    Gender ENUM('Male', 'Female', 'Other'),
    YearsOfWorkExperience TINYINT DEFAULT 0,
    CountriesLivedIn TINYINT DEFAULT 1,
    NetworkDiversity TINYINT DEFAULT 0,
    AccessToEliteContacts TINYINT DEFAULT 0,
    ObligationToNetwork TINYINT DEFAULT 0,
    NetworkReliabilityForTechnicalAdvice TINYINT DEFAULT 0,
    NetworkReliabilityForBusinessGuidance TINYINT DEFAULT 0,
    NetworkReliabilityForFinancialSupport TINYINT DEFAULT 0,
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
};