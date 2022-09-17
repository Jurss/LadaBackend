sqlInsert = "INSERT INTO user (userId, mail, password, firstName, lastName) VALUES (";
sqlSelect = "SELECT userId, mail, password, firstName, lastName FROM user WHERE mail = "

module.exports = {
    sqlInsert: sqlInsert,
    sqlSelect: sqlSelect
}