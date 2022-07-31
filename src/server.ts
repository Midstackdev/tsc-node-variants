import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const router = express();

/** Connect to Mongo */
mongoose
	.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logging.info('connected to mongo');
		startServer();
	})
	.catch((error) => {
		Logging.error('Unable to connect to mongo');
		Logging.error(error);
	});

/** Only start server if mongo connects */
const startServer = () => {
	router.use((req, res, next) => {
		/** Log the Request */
		Logging.primary(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on('finish', () => {
			/** Log the Request */
			Logging.primary(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
		});

		next();
	});

	router.use(express.urlencoded({ extended: true }));

	/** Rules of Api */
	router.use(express.json());

	router.use((req, res, next) => {
		res.header('Access-Control-Allowed-Origin', '*');
		res.header('Access-Control-Allowed-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		if (req.method == 'OPTIONS') {
			res.header('Access-Control-Allowed-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).json({});
		}
		next();
	});

	/** Routes */
	router.use('/author', authorRoutes);
	router.use('/book', bookRoutes);

	/** Healthcheck */
	router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

	/** Error handling */
	router.use((req, res, next) => {
		const error = new Error('not found');
		Logging.error(error);
		return res.status(404).json({ message: error.message });
	});

	http.createServer(router).listen(config.server.port, () => {
		Logging.info(`Server is running on port ${config.server.port}`);
	});
};
