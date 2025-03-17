import express from 'express';
import { conectMongoDB } from './config/mongoDB.config.js';
import router from './common/router.js';
import { errorHandler } from './common/errors/error.handler.js';


const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Rutas de la api
app.use("/api", router);

// Middleware de errores
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
conectMongoDB()
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server ok on PORT: ${process.env.PORT}`));
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
