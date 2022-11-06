const sqlSelect = "SELECT *  FROM `savedrecipe` WHERE `userId` = "
const sqlInsert = "INSERT INTO `savedrecipe` (`userId`, `title`, `quantity`, `typeQuantity`, `costForOne`, `costForQuantitySelect`, `images_url`) VALUES ";
const sqlDelete = "DELETE FROM `savedrecipe` WHERE `id` = "
const sqlUpdatePre = "UPDATE `savedrecipe` SET "
const sqlUpdateMiddle = " = "
const sqlUpdateNext = " WHERE `id` = "
module.exports = {
    sqlSelect: sqlSelect,
    sqlInsert: sqlInsert,
    sqlDelete: sqlDelete,
    sqlUpdatePre: sqlUpdatePre,
    sqlUpdateMiddle: sqlUpdateMiddle,
    sqlUpdateNext: sqlUpdateNext

}