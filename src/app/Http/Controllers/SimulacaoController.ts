import { Request, Response } from 'express';
import ProdutoRepository from '../../../database/repositories/ProdutoRepository';
import { calculaSAC, calculaPRICE } from '../../Services/calcula-parcelas';
import emitEventHub from '../../Services/emit-eventhub';

class SimulacaoController {

	/**
	 * Versão padrão, solicitada no desafio. Recebe os parametros por meio de uma requisição
	 * do tipo POST
	 */
	public async indexPost(request: Request, response: Response): Promise<Response> {

		const { valorDesejado, prazo } = request.body;

		const connection = request.app.locals.db;
		const Produto = new ProdutoRepository(connection);

		const produto = await Produto.findOne(valorDesejado, prazo);

		if (!produto) return response.status(400).json({
			mensagem: 'nao existem produtos correspondentes aos parametros informados'
		});

		const simulacaoSAC = calculaSAC(valorDesejado, prazo, produto.pcTaxaJuros);
		const simulacaoPRICE = calculaPRICE(valorDesejado, prazo, produto.pcTaxaJuros);

		const envelope = {

			'codigoProduto': produto.coProduto,
			'descricaoProduto': produto.noProduto,
			'taxaJuros': produto.pcTaxaJuros,
			'resultadoSimulacao': [
				simulacaoSAC,
				simulacaoPRICE
			]
		};

		emitEventHub(envelope);
		return response.status(200).json(envelope);
	}

	/**
	 * Recebe os parametros por uma requisição do tipo GET, por meio de query strings
	 */
	public async index(request: Request, response: Response): Promise<Response> {

		const valorDesejado = +(request.query.valorDesejado || '0');
		const prazo = +(request.query.prazo || '0');

		const connection = request.app.locals.db;
		const Produto = new ProdutoRepository(connection);

		const produto = await Produto.findOne(valorDesejado, prazo);

		if (!produto) return response.status(400).json({
			mensagem: 'nao existem produtos correspondentes aos parametros informados'
		});

		const simulacaoSAC = calculaSAC(valorDesejado, prazo, produto.pcTaxaJuros);
		const simulacaoPRICE = calculaPRICE(valorDesejado, prazo, produto.pcTaxaJuros);

		const envelope = {

			'codigoProduto': produto.coProduto,
			'descricaoProduto': produto.noProduto,
			'taxaJuros': produto.pcTaxaJuros,
			'resultadoSimulacao': [
				simulacaoSAC,
				simulacaoPRICE
			]
		};

		emitEventHub(envelope);
		return response.status(200).json(envelope);
	}
}

export default new SimulacaoController();
