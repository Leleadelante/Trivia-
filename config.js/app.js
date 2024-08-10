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
      const express = require('express');
      const app = express();

      // Tu código existente de configuración, middlewares, etc.

      // Ruta de inicio simple para verificar el funcionamiento del servidor
      app.get('/', (req, res) => {
          res.send('Servidor en funcionamiento');
          });

          // Otras rutas de tu API
          app.use('/api/trivia', require('./routes/triviaroutes'));
          app.use('/api/users', require('./routes/userRoutes'));

          // Iniciar el servidor en el puerto asignado
          const PORT = process.env.PORT || 3000;
          app.listen(PORT, () => {
              console.log(`Servidor corriendo en el puerto ${PORT}`);
              });