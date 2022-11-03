const user = require("../models/user");
const sqlInsert = user.sqlInsert;
const sqlSelect = user.sqlSelect;
const sqlSelectId = user.sqlSelectId;
const sqlUpdatePre = user.sqlUpdatePre;
const sqlUpdateNext = user.sqlUpdateNext;
const sqlDeleteUser = user.sqlDeleteUser;
const sqlDeleteSavedRecipe = user.sqlDeleteSavedRecipe;
const sqlDeleteElementsForSavedRecipe = user.sqlDeleteElementsForSavedRecipe;
const connection = require('../dbConnect/dbConnect');
let mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const { query } = require("express");

exports.signUp = (req, res, next) => {
    const userId = uuidv4()
    const mail = req.query.mail
    const password = req.query.password
    const firstName = req.query.firstName
    const lastName = req.query.lastName

    bcrypt.hash(password, 15)
        .then(hash => {
            const sqlQuery = mysql.escape(userId) + ", " + mysql.escape(mail) + ", " + mysql.escape(hash) + ", " + mysql.escape(firstName) + ", " + mysql.escape(lastName) + ")"
            connection.query(sqlInsert + sqlQuery, function(err, data) {
                if (err) {
                    if (err.errno === 1062) {
                        res.status(400).json({ error: "Email already exist" })
                    }
                    res.status(400).json({ err })
                } else {
                    res.status(200).json({ res: "fullyfied" })
                }
            })
        })
}

exports.signIn = (req, res, next) => {
    const mail = req.query.mail;
    const pass = req.query.pass;

    const sqlQuery = sqlSelect + mysql.escape(mail)
    connection.query(sqlQuery, function(err, data) {
        if (err) {
            res.status(400).json({ err: "first" })
        } else if (Object.keys(data).length === 0) {
            res.status(401).json({ res: "Mail/Mot de passe incorrect !" })
        } else {
            bcrypt.compare(pass, data[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ res: "Mail/Mot de passe incorrecte" })
                    }
                    res.status(200).json({
                        userId: data[0].userId,
                        token: jwt.sign({ userId: data[0].userId },
                            "ufhqRRGvcSOdIyCOtXm", { expiresIn: "24h" }
                        ),
                        firstName: data[0].firstName,
                        lastName: data[0].lastName
                    })
                })
                .catch(err => res.status(500).json({ err: "two" }))
        }
    })
}

exports.changePass = (req, res, next) => {
    const currentPass = req.query.currentPass;
    const newPass = req.query.newPass;
    const userId = req.query.userId;

    const sqlQuery = sqlSelectId + mysql.escape(userId)
    connection.query(sqlQuery, function(err, data) {
        if (err) {
            res.status(500).json({ err: "Une erreur est survenue." })
        } else {
            bcrypt.compare(currentPass, data[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ res: "Mot de passe Inccorect" })
                    } else {
                        bcrypt.hash(newPass, 15)
                            .then(hash => {
                                const sqlQuery = sqlUpdatePre + hash + sqlUpdateNext + userId + "'";
                                connection.query(sqlQuery, function(err, data) {
                                    if (err) {
                                        res.status(400).json({ err: 'THIS' })
                                    } else {
                                        res.status(200).json({ res: "Success" })
                                    }
                                })
                            })
                    }

                })
                .catch(err => res.status(500).json({ err: "two" }))
        }
    })
}

exports.deleteAccount = (req, res, next) => {
    const password = req.query.password;
    const userId = req.query.userId;

    const sqlQuery = sqlSelectId + mysql.escape(userId)
    connection.query(sqlQuery, function(err, data) {
        bcrypt.compare(password, data[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ res: "Mot de passe Inccorect" })
                } else {
                    connection.query(sqlGetImgPre + userId + sqlGetImgNext, function(err, data) {
                        if (err) {
                            res.status(400).json({ err: err })
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                fs.unlink('images/' + data[i].images_url.substr(33), (err) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                });
                            }
                            connection.query(sqlDeleteUser + userId + "'", function(err, data) {
                                if (err) {
                                    res.status(400).json({ err: err })
                                } else {
                                    connection.query(sqlDeleteElementsForSavedRecipe + userId + "'", function(err, data) {
                                        if (err) {
                                            res.status(400).json({ err: err })
                                        } else {
                                            connection.query(sqlDeleteSavedRecipe + userId + "'", function(err, data) {
                                                if (err) {
                                                    res.status(400).json({ err: err })
                                                } else {
                                                    res.status(200).json({ res: "fullyfied" })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

    })
}