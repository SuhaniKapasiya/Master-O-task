// Entry point for the backend server
const express = require('express');
const app = express();
const config = require('./config/config');
const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());
app.use('/api/game', gameRoutes);

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
