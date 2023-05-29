const express = require('express');
const app = express();
const path = require('path');

// Configuration du serveur Express
// ...

// Route de secours pour servir l'application Vue CLI
app.use(express.static(path.join(__dirname, 'dist')));

// Route de base pour servir l'index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Autres routes ou middleware si nécessaire
// ...

// Démarrage du serveur Express
const port = 3004; // Remplacez par le port souhaité
app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});
