const connection = require('../dbConnect/dbConnect')
let mysql = require('mysql')
const elementsforsavedrecipe = require('../models/elementsForSavedRecipe')
const sqlSelect = elementsforsavedrecipe.sqlSelect;
const sqlInsert = elementsforsavedrecipe.sqlInsert;
const sqlDelete = elementsforsavedrecipe.sqlDelete;
const sqlUpdatePre = elementsforsavedrecipe.sqlUpdatePre;
const sqlUpdateNext = elementsforsavedrecipe.sqlUpdateNext;
const sqlUpdateMiddle = elementsforsavedrecipe.sqlUpdateMiddle;
const filterFloat = require('../logic/filterFloat')

exports.getAllElementsForRecipe = (req, res, next) => {
    const recipeId = req.query.recipeId
    let sqlQuery = sqlSelect + mysql.escape(recipeId);
    connection.query(sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json(data)
        }
    })
}

exports.createElement = (req, res, next) => {
    const data = {
        recipeId: parseInt(req.query.recipeId),
        title: req.query.title,
        unitNb: filterFloat(req.query.unitNb),
        unitTitle: req.query.unitTitle,
        priceFor: filterFloat(req.query.priceFor),
        used: filterFloat(req.query.used)
    }
    const sqlQuery = "((SELECT id FROM savedRecipe WHERE id = " + mysql.escape(data.recipeId) + "), " + mysql.escape(data.title) + ", " + mysql.escape(data.unitNb) + ", " + mysql.escape(data.unitTitle) + ", " + mysql.escape(data.priceFor) + ", " + mysql.escape(data.used) + ")"

    connection.query(sqlInsert + sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })
}

exports.deleteElement = (req, res, next) => {
    const id = req.params.id
    connection.query(sqlDelete + mysql.escape(id), function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })
}

exports.updateElement = (req, res, next) => {
    const field = req.query.field
    const value = req.query.value
    const id = parseInt(req.query.id)

    connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            res.status(200).json({ res: "fullyfied" })
        }
    })
}