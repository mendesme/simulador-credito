import express, { Application } from 'express';
import apiRouter from '@src/routes/api';
import 'dotenv/config';
import ConnectionFactory from '@src/infra/database/connection/ConnectionFactory';

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

		let pool = null;
		const appPool = await ConnectionFactory.getConnection();
		if (appPool) pool = await appPool.connect();
		this.express.locals.db = pool;
	}
}

export default new App().express;

