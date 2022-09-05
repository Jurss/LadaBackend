const savedRecipe = require('../models/savedRecipe')
const sqlSelect = savedRecipe.sqlSelect;
const sqlInsert = savedRecipe.sqlInsert;
const sqlDelete = savedRecipe.sqlDelete;
const sqlUpdatePre = savedRecipe.sqlUpdatePre;
const sqlUpdateNext = savedRecipe.sqlUpdateNext;
const sqlUpdateMiddle = savedRecipe.sqlUpdateMiddle;
const connection = require('../dbConnect/dbConnect')
let mysql = require('mysql')

exports.getAllRecipe = (req, res, next) => {
    const userId = req.query.userId
    let sqlQuery = sqlSelect + mysql.escape(userId);
    connection.query(sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json(data)
        }
    })
}
exports.getOneRecipe = (req, res, next) => {
    const userId = req.params.userId
    const id = req.params.id
    let sqlQuery = "SELECT *  FROM savedRecipe WHERE id = " + id + " AND userId = " + mysql.escape(userId);
    connection.query(sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (Object.keys(data).length === 0) {
            res.status(400).json({ res: "Undifined" })
        } else {
            console.log(typeof data)
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
    const sqlQuery = "(" + mysql.escape(data.userId) + ", " + mysql.escape(data.title) + ", " + mysql.escape(data.quantity) + ", " + mysql.escape(data.typeQuantity) + ", " + mysql.escape(data.costForOne) + ", " + mysql.escape(data.costForQuantitySelect) + ")"
    connection.query(sqlInsert + sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })
}

exports.deleteRecipe = (req, res, next) => {
    const id = req.params.id
    connection.query(sqlDelete + mysql.escape(id), function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })
}

exports.updateRecipe = (req, res, next) => {
    const field = req.query.field;
    const value = req.query.value;
    const id = parseInt(req.query.id);

    console.log(sqlUpdatePre + mysql.escape(field) + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id))

    connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })
}