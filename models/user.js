sqlInsert = "INSERT INTO user (userId, mail, password) VALUES (";
sqlSelect = "SELECT userId, mail, password FROM user WHERE mail = "

module.exports = {
    sqlInsert: sqlInsert,
    sqlSelect: sqlSelect
}