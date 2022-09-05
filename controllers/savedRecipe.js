const savedRecipe = require('../models/savedRecipe')
const sqlInsert = savedRecipe.sqlInsert;
const connection = require('../dbConnect/dbConnect')
let mysql = require('mysql')

exports.getRecipe = (req, res, next) => {
    const userId = req.params.userId
    let sqlQuery = "SELECT *  FROM savedRecipe WHERE userId = " + mysql.escape(userId);
    connection.query(sqlQuery, function(err, data) {
        if (err) console.log(err)
        else {
            res.status(200).json(data)
        }
    })

}

exports.createRecipe = (req, res, next) => {
    const data = {
        userId: req.query.userId,
        title: req.query.title,
        quantity: req.query.quantity,
        typeQuantity: req.query.typeQuantity,
        costForOne: req.query.costForOne,
        costForQuantitySelect: req.query.costForQuantitySelect
    }
    const sqlQuery = "('" + data.userId + "', '" + data.title + "', " + data.quantity + ", '" + data.typeQuantity + "', " + data.costForOne + ", " + data.costForQuantitySelect + ")"
    connection.query(sqlInsert + sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })


}