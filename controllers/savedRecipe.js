const savedRecipe = require('../models/savedRecipe')
const sqlSelect = savedRecipe.sqlSelect;
const sqlInsert = savedRecipe.sqlInsert;
const sqlDelete = savedRecipe.sqlDelete;
const sqlUpdatePre = savedRecipe.sqlUpdatePre;
const sqlUpdateNext = savedRecipe.sqlUpdateNext;
const sqlUpdateMiddle = savedRecipe.sqlUpdateMiddle;
const connection = require('../dbConnect/dbConnect')
let mysql = require('mysql');
const fs = require("fs");

exports.getAllRecipe = (req, res, next) => {
    const userId = req.auth.userId
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
    const userId = req.auth.userId
    const id = req.params.id
    let sqlQuery = "SELECT *  FROM savedrecipe WHERE id = " + id + " AND userId = " + mysql.escape(userId);
    connection.query(sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (Object.keys(data).length === 0) {
            res.status(400).json({ res: "Undifined" })
        } else {
            res.status(200).json(data)
        }
    })

}

exports.createRecipe = (req, res, next) => {
    const data = {
        userId: req.auth.userId,
        title: req.body.title,
        quantity: parseInt(req.body.quantity),
        typeQuantity: req.body.typeQuantity,
        costForOne: parseFloat(req.body.costForOne),
        costForQuantitySelect: parseFloat(req.body.costForQuantitySelect),
        images: req.file ? `${req.protocol}s://${req.get('host')}/images/${req.file.filename}` : "NULL"
    }
    const sqlQuery = "(" + mysql.escape(data.userId) + ", " + mysql.escape(data.title) + ", " + mysql.escape(data.quantity) + ", " + mysql.escape(data.typeQuantity) + ", " + mysql.escape(data.costForOne) + ", " + mysql.escape(data.costForQuantitySelect) + ", " + mysql.escape(data.images) + ")"
    connection.query(sqlInsert + sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else {
            connection.query("SELECT LAST_INSERT_ID()", function(err, data) {
                res.status(200).json({ data })
            })

        }
    })
}

exports.deleteRecipe = (req, res, next) => {
    const id = req.query.id
    const userId = req.auth.userId
    let images_url;

    const exists = "SELECT * FROM savedrecipe WHERE id = " + mysql.escape(id) + " AND userId = " + mysql.escape(userId)
    connection.query(exists, function(err, data) {
        if (err) {
            res.status(400).json({ err })
        } else if (data.length <= 0) {
            res.status(401).json({ res: "unauthorized" })
        } else {
            if (data[0].images_url === 'NULL') {
                connection.query(sqlDelete + mysql.escape(id) + "AND userId = " + mysql.escape(userId), function(err, data) {
                    if (err) {
                        res.status(400).json({ err })
                    } else {
                        res.status(200).json({ res: "fullyfied" })
                    }
                })
            } else {
                images_url = data[0].images_url
                connection.query(sqlDelete + mysql.escape(id) + "AND userId = " + mysql.escape(userId), function(err, data) {
                    if (err) {
                        res.status(400).json({ err })
                    } else {
                        const filename = images_url.split('/images/')[1];
                        fs.unlink('images/' + filename, (err) => {
                            if (err) {
                                res.status(400).json({ err })
                            } else {
                                res.status(200).json({ res: "fullyfied" })
                            }
                        });
                    }
                })

            }
        }
    })
}

exports.updateRecipe = (req, res, next) => {
    if (req.file === undefined) {
        const field = req.body.field;
        const value = req.body.value;
        const id = parseInt(req.body.id);
        const userId = req.auth.userId
        let images_url;

        const exists = "SELECT * FROM `savedrecipe` WHERE `id` = " + mysql.escape(id) + " AND `userId` = " + mysql.escape(userId)
        connection.query(exists, function(err, data) {
            if (err) {
                res.status(400).json({ err })
            } else if (data.length <= 0) {
                res.status(401).json({ res: "unauthorized" })
            } else {
                images_url = data[0].images_url
                if (images_url === 'NULL') {
                    connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
                        if (err) {
                            res.status(400).json({ err })
                        } else {
                            res.status(200).json({ res: "fullyfied" })
                        }
                    })
                } else {
                    const filename = images_url.split('/images/')[1];
                    fs.unlink('images/' + filename, (err) => {
                        if (err) {
                            res.status(400).json({ err })
                        } else {
                            connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
                                if (err) {
                                    res.status(400).json({ err })
                                } else {
                                    res.status(200).json({ res: "fullyfied" })
                                }
                            })
                        }
                    });
                }
            }
        })

    } else {
        const field = req.body.field;
        const value = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const id = parseInt(req.body.id);
        const userId = req.auth.userId
        let images_url;

        const exists = "SELECT * FROM `savedrecipe` WHERE `id` = " + mysql.escape(id) + " AND `userId` = " + mysql.escape(userId)
        connection.query(exists, function(err, data) {
            if (err) {
                res.status(400).json({ err })
            } else if (data.length <= 0) {
                res.status(401).json({ res: "unauthorized" })
            } else {
                images_url = data[0].images_url
                if (images_url === "NULL") {
                    connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
                        if (err) {
                            res.status(400).json({ err })
                        } else {
                            res.status(200).json({ res: "fullyfied" })
                        }
                    })
                } else {
                    const filename = images_url.split('/images/')[1];
                    fs.unlink('images/' + filename, (err) => {
                        if (err) {
                            res.status(400).json({ err })
                        } else {
                            connection.query(sqlUpdatePre + field + sqlUpdateMiddle + mysql.escape(value) + sqlUpdateNext + mysql.escape(id), function(err, data) {
                                if (err) {
                                    res.status(400).json({ err })
                                } else {
                                    res.status(200).json({ res: "fullyfied" })
                                }
                            })
                        }
                    });
                }
            }
        })

    }
}