const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaire');

// Route pour créer un commentaire
router.post('/', commentaireController.createCommentaire);

// Route pour récupérer tous les commentaires
router.get('/', commentaireController.getAllCommentaires);

// Route pour récupérer un commentaire par ID
router.get('/:id', commentaireController.getCommentaireById);

// Route pour mettre à jour un commentaire
router.put('/:id', commentaireController.updateCommentaire);

// Route pour supprimer un commentaire
router.delete('/:id', commentaireController.deleteCommentaire);

module.exports = router;
