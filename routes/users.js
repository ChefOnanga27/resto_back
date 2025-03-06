const express = require('express');
const router = express.Router();
const userController = require('../controllers/users'); // Contrôleur des utilisateurs
const authMiddleware = require('../middlewares/authMiddlewares'); // Middleware d'authentification
const adminMiddleware = require('../middlewares/adminMiddleware'); // Middleware d'autorisation admin

// Route pour la création d'un utilisateur (Inscription)
router.post('/register', userController.createUser);

// Route pour la connexion d'un utilisateur (Login)
router.post('/login', userController.loginUser);

// Routes accessibles uniquement par l'utilisateur connecté
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.delete('/profile', authMiddleware, userController.deleteUserProfile);

// Routes réservées aux administrateurs
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, adminMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, adminMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
