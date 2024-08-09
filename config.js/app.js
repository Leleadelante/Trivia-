const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    const userRoutes = require('./routes/userRoutes');
    const triviaRoutes = require('./routes/triviaroutes');

    app.use('/api/users', userRoutes);
    app.use('/api/trivia', triviaRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      });