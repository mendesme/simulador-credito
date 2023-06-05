import sql from 'mssql';

const config: sql.config = {

	server: process.env.DB_HOST as string,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	options: {
		// trustedconnection: true,
		trustServerCertificate: true,
		enableArithAbort: true,
		encrypt: true,
		cryptoCredentialsDetails: {
			minVersion: 'TLSv1'
		}
	}
};

const ConnectionFactory = {

	async getConnection() {

		try {
			const appPool = new sql.ConnectionPool(config);

			const connection = await appPool.connect();

			return connection;

		} catch (err: any) {
			// eslint-disable-next-line no-console
			console.log(err);
			throw new Error(err.message);
		}
	}
};

export default ConnectionFactory;
