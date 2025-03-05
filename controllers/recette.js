const Recette = require('../models/recette'); // Import du modèle

// Créer une recette
exports.createRecette = async (req, res) => {
  try {
    const { name, description, ingredients, instructions, preparationTime } = req.body;
    const recette = await Recette.create({
      name,
      description,
      ingredients,
      instructions,
      preparationTime,
    });
    res.status(201).json(recette);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la recette" });
  }
};

// Récupérer toutes les recettes
exports.getAllRecettes = async (req, res) => {
  try {
    const recettes = await Recette.findAll();
    res.status(200).json(recettes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des recettes" });
  }
};

// Récupérer une recette par son ID
exports.getRecetteById = async (req, res) => {
  try {
    const { id } = req.params;
    const recette = await Recette.findByPk(id);
    if (!recette) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }
    res.status(200).json(recette);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de la recette" });
  }
};

// Mettre à jour une recette
exports.updateRecette = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, ingredients, instructions, preparationTime } = req.body;
    const recette = await Recette.findByPk(id);
    if (!recette) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }
    recette.name = name;
    recette.description = description;
    recette.ingredients = ingredients;
    recette.instructions = instructions;
    recette.preparationTime = preparationTime;
    await recette.save();
    res.status(200).json(recette);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la recette" });
  }
};

// Supprimer une recette
exports.deleteRecette = async (req, res) => {
  try {
    const { id } = req.params;
    const recette = await Recette.findByPk(id);
    if (!recette) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }
    await recette.destroy();
    res.status(200).json({ message: "Recette supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la recette" });
  }
};
