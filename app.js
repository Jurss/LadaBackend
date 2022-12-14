const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user')
const savedRecipeRoutes = require('./routes/savedRecipe');
const elementsforsavedrecipeRoutes = require('./routes/elementsForSavedRecipe');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes)
app.use('/api/saveRecipe', savedRecipeRoutes);
app.use('/api/elementsforsavedrecipe', elementsforsavedrecipeRoutes);

module.exports = app;