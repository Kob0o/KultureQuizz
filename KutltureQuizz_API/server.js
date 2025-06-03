const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', quizRoutes);

app.listen(PORT, () => {
  console.log(`Kulture Quizz API running on http://localhost:${PORT}`);
});
