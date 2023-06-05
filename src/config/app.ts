import express, { Application } from 'express';
import apiRouter from '../routes/api';
import 'dotenv/config';
import ConnectionFactory from '../database/connection/ConnectionFactory';

class App {

	public express: Application;

	public constructor() {

		this.express = express();
		this.init();
	}

	private init(): void {

		this.middlewares();
		this.routes();
		this.database();
	}

	private middlewares(): void {

		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: true }));
	}

	private routes(): void {

		this.express.use('/api', apiRouter);
	}

	private async database() {

		const appPool = await ConnectionFactory.getConnection();
		const pool = await appPool.connect();
		this.express.locals.db = pool;
	}
}

export default new App().express;


