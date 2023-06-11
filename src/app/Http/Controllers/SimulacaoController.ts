import { Request, Response } from 'express';
import { calculaSAC, calculaPRICE } from '@src/app/Services/calcula-parcelas';
import ProdutoRepository from '@src/infra/database/repositories/ProdutoRepository';
import SimulacaoCreated from '@src/app/Listeners/SimulacaoCreated';
class SimulacaoController {

	public async index(request: Request, response: Response): Promise<Response> {

		const { valorDesejado, prazo } = response.locals.simulacao;

		ProdutoRepository.openSession();
		const produto = await ProdutoRepository.findOne(valorDesejado, prazo);

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

		// Dispara o evento "SimulacaoCreated". Nesta aplicação o único ouvinte é eventhub
		SimulacaoCreated.dispatch(envelope);

		return response.status(200).json(envelope);
	}
}

export default new SimulacaoController();
