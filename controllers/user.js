const user = require("../models/user");
const sqlInsert = user.sqlInsert;
const sqlSelect = user.sqlSelect;
const connection = require('../dbConnect/dbConnect');
let mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const userId = uuidv4()
    const mail = req.query.mail
    const password = req.query.password

    bcrypt.hash(password, 15)
        .then(hash => {
            const sqlQuery = mysql.escape(userId) + ", " + mysql.escape(mail) + ", " + mysql.escape(hash) + ")"
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
            res.status(400).json({ res: "Mail/Mot de passe incorrecte" })
        } else {
            console.log(data[0].password)
            bcrypt.compare(pass, data[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ res: "Mail/Mot de passe incorrecte" })
                    }
                    res.status(200).json({
                        userId: data[0].userId,
                        token: jwt.sign({ userId: data[0].userId },
                            process.env.JWT_TOKEN, { expiresIn: "24h" }
                        )
                    })
                })
                .catch(err => res.status(500).json({ err: "two" }))
        }
    })
}