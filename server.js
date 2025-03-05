const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./config/db"); // ✅ Import correct


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour autoriser les requêtes CORS
app.use(cors());
// Middleware pour parser les données JSON dans les requêtes
app.use(express.json());

// Import des routes
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recette");
const commentRoutes = require("./routes/commentaire");

app.use("/api/user", userRoutes);
app.use("/api/recette", recipeRoutes);
app.use("/api/commentaire", commentRoutes);

// Synchronisation de la base de données
sequelize.sync({ force: true })  // force: true pour supprimer et recréer les tables
  .then(() => {
    console.log("La base de données a été synchronisée");
    
    app.get("/", (req, res) => {
      res.send("L'API fonctionne !");
  });
    // Démarrer le serveur après la synchronisation
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la synchronisation de la base de données:", error);
  });
