const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe.model');
const chalk = require('chalk');

//POST Create new recipe
router.post('/', async (req, res) => {
  try {
    const existing = await Recipe.findOne({title: req.body.title});
    if (existing) {
      console.log(chalk.red(`${existing.title} is already exist`));
      return res
        .status(400)
        .json({error: `${existing.title} is already exist`});
    }
    const createdRecipe = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    console.log(chalk.green('New recipe was created'));
    res.status(201).json(createdRecipe);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(chalk.red('Validation failed', err.message));
      return res.status(400).json('Validation Error');
    }
    console.log(chalk.red('Can not create new recipe'));
    return res.status(404).json({error: err.message});
  }
});
//Get all recipes
router.get('/', async (req, res) => {
  try {
    const getRecipes = await Recipe.find();
    res.status(200).json(getRecipes);
    console.log(chalk.green('Get all recipes is ok \u2705'));
    console.log(chalk.bold('List of recipes titles:'));
    getRecipes.forEach((el) => {
      console.log(chalk.italic(el.title));
    });
  } catch (err) {
    console.log(chalk.red('Cannot found recipes'));
    return res.status(500).json({error: err.message});
  }
});
//MODULE EXPORT
//GET single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipeID = req.params.id;
    const getRecipeId = await Recipe.findById(recipeID);
    if (!getRecipeId) {
      console.log(chalk.red(`Recipe was not found`));
      return res.status(404).json({error: 'Recipe was not found'});
    }
    console.log(chalk.green(`${getRecipeId.title} was found`));
    res.status(200).json(getRecipeId);
  } catch (err) {
    console.log(chalk.red('Can not get recipe'));
    return res.status(500).json({error: err.message});
  }
});
//UPDATE single recipe
router.put('/:id', async (req, res) => {
  try {
    const recipeID = req.params.id;
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeID, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRecipe) {
      console.log(chalk.red(`Recipe was not found`));
      return res.status(404).json({error: 'Recipe was not found'});
    }
    console.log(chalk.green(`Recipe ${updatedRecipe.title} was updeted`));
    res.status(200).json(updatedRecipe);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(chalk.red('Validation failed', err.message));
      return res.status(400).json('Validation error');
    }
    console.log(chalk.red('Can not update recipe'));
    return res.status(500).json({error: err.message});
  }
});
//DELETE a single recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipeID = req.params.id;
    const deleteRecipe = await Recipe.findByIdAndDelete(recipeID);
    if (!deleteRecipe) {
      console.log(chalk.red('Recipe not found'));
      return res.status(500).json({error: 'Recipe not found'});
    }
    console.log(chalk.green(`Recipe ${deleteRecipe.title} was deleted`));
    res.status(204).json(deleteRecipe);
  } catch (err) {
    console.log(chalk.red(`Can not delete recipe`));
    return res.status(500).json({error: err.message});
  }
});
module.exports = router;
