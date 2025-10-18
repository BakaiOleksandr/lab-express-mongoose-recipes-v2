const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const chalk = require('chalk');
const recipeRouter = require('./routes/recipeRouter');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoDB_URL =
  'mongodb+srv://AlexB:58998@cluster0.17vkuul.mongodb.net/RecipesData';
mongoose
  .connect(mongoDB_URL)
  .then((x) => {
    console.log(
      chalk.blue(
        `Connected to Mongo! Database name: "${x.connections[0].name}" \u2705`
      )
    );
    console.log(chalk.blue(`Collections:`, Object.keys(x.connections[0].collections)));
  })
  .catch((err) => console.log(chalk.red('Error connecting to Mongo', err)));

// ROUTES
app.use('/api/recipes', recipeRouter);

//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    console.log(chalk.green('Get is working \u2705'))
  res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log(chalk.blue('My first app listening on port 3000!')));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
