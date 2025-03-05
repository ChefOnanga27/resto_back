const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Créer un utilisateur (Inscription)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, bio, location, avatar, role } = req.body;

    // Par défaut, un utilisateur crée un utilisateur "utilisateur"
    const newRole = role === 'admin' ? 'admin' : 'utilisateur';

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
      location,
      avatar,
      role: newRole,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

// Connexion d'un utilisateur (login)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Durée de validité du token
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

// Récupérer tous les utilisateurs (Uniquement pour les admins)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, bio, location, avatar, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du rôle : un admin peut modifier n'importe quel profil, un utilisateur ne peut modifier que son propre profil
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: "Vous n'avez pas la permission de modifier ce profil" });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.bio = bio;
    user.location = location;
    user.avatar = avatar;
    user.role = role; // L'admin peut mettre à jour le rôle d'un utilisateur
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du rôle : seuls les admins peuvent supprimer des utilisateurs
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous n'avez pas la permission de supprimer cet utilisateur" });
    }

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};
