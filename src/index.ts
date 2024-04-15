import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { ConfigurationError, SystemError, ErrorHandlerMiddleware } from './common/middleware/error-middleware.js';
import studentRouter from './route/student-route.js';
import jobRouter from './route/job-route.js';

env.config();
const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'local';
const service = process.env.SERVICE || 'local';
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI || MONGO_URI == undefined) {
	throw new ConfigurationError('MONGO_URI is not set in the envionment');
}
const app = express().use(cors()).use(express.json());

async function connectToDB(mongoUri: string) {
	try {
		await mongoose.connect(mongoUri, {
			dbName: 'hirestud',
		});
		console.log('database connected successfully');
	} catch (err) {
		console.log('error in connecting to mongoDB', err);
	}
}
connectToDB(MONGO_URI);

app.get('/home', (req, res) => {
	res.send({
		message: 'Service running',
		dbConnected: mongoose.connection.readyState === 1,
	});
});
app.get('/', (req, res) => res.send('Express on Vercel'));

app.use('/students', studentRouter);
app.use('/jobs', jobRouter);

app.use((err: SystemError, req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(500).send({
		error: err.message,
		stack: err.stack,
	});
});

app.use('*', (req, res) => {
	res.status(404).send({
		error: 'AUTH404: Could not find the page requested by you',
	});
});
app.use(ErrorHandlerMiddleware);
app.listen(port, () => {
	console.log('App listening on port service is ', port, service);
});
// https://www.youtube.com/watch?v=T5t46vuW8fo&ab_channel=CodeBucks
