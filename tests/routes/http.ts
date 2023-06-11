const baseUrl = 'http://localhost:3000/api';

const fetchSimulacao = {

	async queryString(valorDesejado: number, prazo: number) {

		const url = baseUrl + `/simulacao?valorDesejado=${valorDesejado}&prazo=${prazo}`;

		const response = await fetch(url);
		const jsonResponse = await response.json();

		return {

			status: response.status,
			headers: {
				contentType: response.headers.get('content-type')
			},
			body: jsonResponse
		};
	},

	async post(valorDesejado: number, prazo: number) {

		const options = {

			method: 'POST',
			headers: {

				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ valorDesejado, prazo })
		};

		const url = baseUrl + '/simulacao';

		const response = await fetch(url, options);
		const jsonResponse = await response.json();

		return {

			status: response.status,
			headers: {
				contentType: response.headers.get('content-type')
			},
			body: jsonResponse
		};
	}
};

export default fetchSimulacao;



