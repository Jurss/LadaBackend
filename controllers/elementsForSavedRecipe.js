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
    const userId = req.auth.userId
    const recipeId = req.query.recipeId

    const exists = "SELECT * FROM savedrecipe WHERE id = " + mysql.escape(recipeId) + " AND userId = " + mysql.escape(userId)
    const sqlQuery = sqlSelect + mysql.escape(recipeId);

    connection.query(exists, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (data.length <= 0) {
            res.status(401).json({ res: "unauthorized" })
        } else {
            connection.query(sqlQuery, function(err, data) {
                if (err) {
                    res.status(400).json({ err })
                } else {
                    res.status(200).json(data)
                }
            })
        }
    })
}

exports.getOneElement = (req, res, next) => {

    const id = req.query.id
    const userId = req.auth.userId
    connection.query("SELECT * FROM elementsforsavedrecipe WHERE id = " + id + " AND userId = '" + userId + "'", function(err, data) {
        if (err) {
            res.status(400).json({ err: err })
        } else {
            res.status(200).json({ data: data })
        }
    })
}

exports.createElement = (req, res, next) => {
    const userId = req.auth.userId
    const data = {
        recipeId: req.query.recipeId,
        userId: userId,
        title: req.query.title,
        unitNb: filterFloat(req.query.unitNb),
        unitTitle: req.query.unitTitle,
        priceFor: filterFloat(req.query.priceFor),
        used: filterFloat(req.query.used)
    }
    const sqlQuery = "((SELECT id FROM savedrecipe WHERE id = " + mysql.escape(data.recipeId) + "), " + mysql.escape(req.auth.userId) + ', ' + mysql.escape(data.title) + ", " + mysql.escape(data.unitNb) + ", " + mysql.escape(data.unitTitle) + ", " + mysql.escape(data.priceFor) + ", " + mysql.escape(data.used) + ")"
    const exists = "SELECT * FROM savedrecipe WHERE id = " + mysql.escape(data.recipeId) + " AND userId = " + mysql.escape(userId)
    connection.query(exists, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (data.length <= 0) {
            res.status(401).json({ res: "unauthorized" })
        } else {
            connection.query(sqlInsert + sqlQuery, function(err, data) {
                if (err) {
                    res.status(400).json({ err })
                } else {
                    res.status(200).json({ res: "fullyfied" })
                }
            })
        }
    })
}

exports.deleteElement = (req, res, next) => {
    const userId = req.auth.userId
    const recipeId = req.query.recipeId
    const id = req.query.id

    const exists = "SELECT * FROM elementsforsavedrecipe WHERE id = " + mysql.escape(id) + " AND userId = " + mysql.escape(userId) + " AND recipeId = " + recipeId
    console.log(exists)
    connection.query(exists, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (data.length <= 0) {
            res.status(401).json({ res: "unauthorized" })
        } else {
            connection.query(sqlDelete + mysql.escape(id), function(err, data) {
                if (err) {
                    res.status(400).json({ err })
                } else {
                    res.status(200).json({ res: "fullyfied" })
                }
            })
        }
    })
}

exports.updateElement = (req, res, next) => {
    const field = req.query.field
    const value = req.query.value
    const id = parseInt(req.query.id)
    const userId = req.auth.userId

    const exists = "SELECT * FROM elementsforsavedrecipe WHERE id = " + mysql.escape(id) + " AND userId = " + mysql.escape(userId)
    connection.query(exists, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (data.length <= 0) {
            res.status(401).json({ res: "unauthorized" })
        } else {
            connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
                if (err) {
                    res.status(400).json({ err })
                } else {
                    res.status(200).json({ res: "fullyfied" })
                }
            })
        }
    })
}