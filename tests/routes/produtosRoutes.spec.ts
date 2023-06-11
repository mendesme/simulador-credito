/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import fetchSimulacao from './http';
import { test, it, describe, expect } from 'vitest';

/* Testes de Integração */

// GET em /api/simulacao?valorDesejado=XXXX&prazo=XXX
// const fetchApi = fetchSimulacao.queryString;

// POST em /api/simulacao
const fetchApi = fetchSimulacao.post;

describe('Teste da api de simulacao de credito', () => {

	test('valorDesejado = 900.00 e  prazo = 5', async () => {

		const response = await fetchApi(900, 5);

		const parcelasSAC = response.body.resultadoSimulacao[0].parcelas;
		const parcelasPRICE = response.body.resultadoSimulacao[1].parcelas;

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty('codigoProduto', 1);
		expect(response.body).toHaveProperty('descricaoProduto', 'Produto 1');
		expect(response.body).toHaveProperty('taxaJuros', 0.0179);
		expect(response.body).toHaveProperty('resultadoSimulacao');

		expect(parcelasSAC).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 2,
					valorAmortizacao: 180,
					valorJuros: 12.89,
					valorPrestacao: 192.89
				}),
				expect.objectContaining({
					numero: 4,
					valorAmortizacao: 180,
					valorJuros: 6.44,
					valorPrestacao: 186.44
				})
			])
		);

		expect(parcelasPRICE).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 2,
					valorAmortizacao: 176.78,
					valorJuros: 13.00,
					valorPrestacao: 189.78
				}),
				expect.objectContaining({
					numero: 4,
					valorAmortizacao: 183.16,
					valorJuros: 6.62,
					valorPrestacao: 189.78
				})
			])
		);
	});

	test('valorDesejado = 95_875.56 e  prazo = 36', async () => {

		const response = await fetchApi(95_875.56, 36);

		const parcelasSAC = response.body.resultadoSimulacao[0].parcelas;
		const parcelasPRICE = response.body.resultadoSimulacao[1].parcelas;

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty('codigoProduto', 2);
		expect(response.body).toHaveProperty('descricaoProduto', 'Produto 2');
		expect(response.body).toHaveProperty('taxaJuros', 0.0175);
		expect(response.body).toHaveProperty('resultadoSimulacao');

		expect(parcelasSAC).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 9,
					valorAmortizacao: 2_663.21,
					valorJuros: 1_304.97,
					valorPrestacao: 3_968.18
				}),
				expect.objectContaining({
					numero: 27,
					valorAmortizacao: 2_663.21,
					valorJuros: 466.06,
					valorPrestacao: 3_129.27
				})
			])
		);

		expect(parcelasPRICE).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 9,
					valorAmortizacao: 2_222.28,
					valorJuros: 1_389.84,
					valorPrestacao: 3_612.12
				}),
				expect.objectContaining({
					numero: 27,
					valorAmortizacao: 3_036.81,
					valorJuros: 575.31,
					valorPrestacao: 3_612.12
				})
			])
		);
	});

	test('valorDesejado = 1_000_000.00 e  prazo = 49', async () => {

		const response = await fetchApi(1_000_000.00, 49);

		const parcelasSAC = response.body.resultadoSimulacao[0].parcelas;
		const parcelasPRICE = response.body.resultadoSimulacao[1].parcelas;

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty('codigoProduto', 3);
		expect(response.body).toHaveProperty('descricaoProduto', 'Produto 3');
		expect(response.body).toHaveProperty('taxaJuros', 0.0182);
		expect(response.body).toHaveProperty('resultadoSimulacao');

		expect(parcelasSAC).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 1,
					valorAmortizacao: 20_408.16,
					valorJuros: 18_200.00,
					valorPrestacao: 38_608.16
				}),
				expect.objectContaining({
					numero: 49,
					valorAmortizacao: 20_408.16,
					valorJuros: 371.43,
					valorPrestacao: 20_779.59
				})
			])
		);

		expect(parcelasPRICE).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 1,
					valorAmortizacao: 12_816.59,
					valorJuros: 18_200.00,
					valorPrestacao: 31_016.59
				}),
				expect.objectContaining({
					numero: 49,
					valorAmortizacao: 30_462.18,
					valorJuros: 554.41,
					valorPrestacao: 31_016.59
				})
			])
		);
	});

	test('valorDesejado = 8_785_125.39 e  prazo = 279', async () => {

		const response = await fetchApi(8_785_125.39, 279);

		const parcelasSAC = response.body.resultadoSimulacao[0].parcelas;
		const parcelasPRICE = response.body.resultadoSimulacao[1].parcelas;

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty('codigoProduto', 4);
		expect(response.body).toHaveProperty('descricaoProduto', 'Produto 4');
		expect(response.body).toHaveProperty('taxaJuros', 0.0151);
		expect(response.body).toHaveProperty('resultadoSimulacao');

		expect(parcelasSAC).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 15,
					valorAmortizacao: 31_487.90,
					valorJuros: 125_998.85,
					valorPrestacao: 157_486.75
				}),
				expect.objectContaining({
					numero: 275,
					valorAmortizacao: 31_487.90,
					valorJuros: 2_377.36,
					valorPrestacao: 33_865.26
				})
			])
		);

		expect(parcelasPRICE).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					numero: 15,
					valorAmortizacao: 2_538.47,
					valorJuros: 132_174.94,
					valorPrestacao: 134_713.41
				}),
				expect.objectContaining({
					numero: 275,
					valorAmortizacao: 124_987.80,
					valorJuros: 9_725.61,
					valorPrestacao: 134_713.41
				})
			])
		);
	});

	it('deve falhar: valorDesejado = 199 e  prazo = 12', async () => {

		const response = await fetchApi(199, 12);

		expect(response.status).toBe(400);
		expect(response.body)
			.toHaveProperty('mensagem', 'nao existem produtos correspondentes aos parametros informados');
	});

	it('deve falhar: valorDesejado = 900 e  prazo = 25', async () => {

		const response = await fetchApi(900, 25);

		expect(response.status).toBe(400);
		expect(response.body)
			.toHaveProperty('mensagem', 'nao existem produtos correspondentes aos parametros informados');
	});

	it('deve falhar: valorDesejado = 90000 e  prazo = 24', async () => {

		const response = await fetchApi(90000, 24);

		expect(response.status).toBe(400);
		expect(response.body)
			.toHaveProperty('mensagem', 'nao existem produtos correspondentes aos parametros informados');
	});

	it('deve falhar: valorDesejado = 1_000_000.01 e  prazo = 96', async () => {

		const response = await fetchApi(1_000_000.01, 96);

		expect(response.status).toBe(400);
		expect(response.body)
			.toHaveProperty('mensagem', 'nao existem produtos correspondentes aos parametros informados');
	});
});







