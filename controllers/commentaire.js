const Commentaire = require('../models/Commentaire'); // Import du modèle

// Créer un commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const { text, author } = req.body;
    const commentaire = await Commentaire.create({
      text,
      author,
    });
    res.status(201).json(commentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du commentaire" });
  }
};

// Récupérer tous les commentaires
exports.getAllCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll();
    res.status(200).json(commentaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires" });
  }
};

// Récupérer un commentaire par son ID
exports.getCommentaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentaire = await Commentaire.findByPk(id);
    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    res.status(200).json(commentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du commentaire" });
  }
};

// Mettre à jour un commentaire
exports.updateCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;
    const commentaire = await Commentaire.findByPk(id);
    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    commentaire.text = text;
    commentaire.author = author;
    await commentaire.save();
    res.status(200).json(commentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire" });
  }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    const commentaire = await Commentaire.findByPk(id);
    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    await commentaire.destroy();
    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression du commentaire" });
  }
};
