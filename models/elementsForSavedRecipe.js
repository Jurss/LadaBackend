const sqlSelect = "SELECT *  FROM elementsforsavedrecipe WHERE recipeId = "
const sqlInsert = ("INSERT INTO elementsforsavedrecipe (recipeId, userId, title, unitNb, unitTitle, priceFor, used) VALUES ");
const sqlDelete = "DELETE FROM elementsforsavedrecipe WHERE id = "
const sqlUpdatePre = "UPDATE elementsforsavedrecipe SET "
const sqlUpdateMiddle = " = "
const sqlUpdateNext = " WHERE id = "
module.exports = {
    sqlSelect: sqlSelect,
    sqlInsert: sqlInsert,
    sqlDelete: sqlDelete,
    sqlUpdatePre: sqlUpdatePre,
    sqlUpdateMiddle: sqlUpdateMiddle,
    sqlUpdateNext: sqlUpdateNext

}