sqlInsert = "INSERT INTO user (userId, mail, password, firstName, lastName) VALUES (";
sqlSelect = "SELECT userId, mail, password, firstName, lastName FROM user WHERE mail = "
sqlSelectId = "SELECT userId, password FROM `user` WHERE userId = "
sqlUpdatePre = "UPDATE `user` SET `password` = '"
sqlUpdateNext = "' WHERE `userId` = '"

sqlGetImgPre = "SELECT `images_url` FROM `savedrecipe` WHERE `userId` = '"
sqlGetImgNext = "' AND `images_url` != 'NULL'"
sqlDeleteUser = "DELETE FROM `user` WHERE `userId` = '"
sqlDeleteSavedRecipe = "DELETE FROM `savedrecipe` WHERE `userId` = '"
sqlDeleteElementsForSavedRecipe = "DELETE FROM `elementsforsavedrecipe` WHERE `userId` = '"

module.exports = {
    sqlInsert: sqlInsert,
    sqlSelect: sqlSelect,
    sqlSelectId: sqlSelectId,
    sqlUpdatePre: sqlUpdatePre,
    sqlUpdateNext: sqlUpdateNext,
    sqlGetImgPre,
    sqlGetImgNext,
    sqlDeleteUser,
    sqlDeleteSavedRecipe,
    sqlDeleteElementsForSavedRecipe
}