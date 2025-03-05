const express = require('express');
const router = express.Router();
const recetteController = require('../controllers/recette');

// Route pour créer une recette
router.post('/', recetteController.createRecette);

// Route pour récupérer toutes les recettes
router.get('/', recetteController.getAllRecettes);

// Route pour récupérer une recette par ID
router.get('/:id', recetteController.getRecetteById);

// Route pour mettre à jour une recette
router.put('/:id', recetteController.updateRecette);

// Route pour supprimer une recette
router.delete('/:id', recetteController.deleteRecette);

module.exports = router;
