import express from 'express';
import { conectMongoDB } from './config/mongoDB.config.js';
import router from './common/router.js';
import { errorHandler } from './common/errors/error.handler.js';
import cookieParser from 'cookie-parser';
import compression from 'express-compression';
import { logger } from './common/utils/logger.js';
import swaggerUiExpress from "swagger-ui-express";
import { specs } from './config/swagger.config.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression({ brotli: { enabled: true, zlib: {} } }))

// Rutas de la api
app.use("/api", router);

//Documentation
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// Middleware de errores
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
conectMongoDB()
    .then(() => {
        app.listen(process.env.PORT, () => logger.info(`Server ok on PORT: ${process.env.PORT}`));
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error);
    });
