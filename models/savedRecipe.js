const sqlSelect = "SELECT *  FROM savedRecipe WHERE userId = "
const sqlInsert = ("INSERT INTO savedRecipe (userId, title, quantity, typeQuantity, costForOne, costForQuantitySelect) VALUES ");
const sqlDelete = "DELETE FROM savedRecipe WHERE id = "
const sqlUpdatePre = "UPDATE savedRecipe SET "
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