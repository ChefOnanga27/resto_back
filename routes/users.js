const express = require('express');
const router = express.Router();
const userController = require('../controllers/users'); // Chemin vers le contrôleur des utilisateurs
const authMiddleware = require('../middlewares/authMiddlewares'); // Middleware d'authentification

// Route pour la création d'un utilisateur (Inscription)
router.post('/register', userController.createUser);

// Route pour la connexion d'un utilisateur (Login)
router.post('/login', userController.loginUser);

// Route pour récupérer tous les utilisateurs (Uniquement pour les admins)
router.get('/', authMiddleware, userController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', authMiddleware, userController.getUserById);

// Route pour mettre à jour un utilisateur
router.put('/:id', authMiddleware, userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
