import app from '@src/config/app';
import sql from 'mssql';
import { IProduto, Produto } from '@src/app/Models/Produto';

class ProdutoRepository {

	private connection: sql.ConnectionPool | null;

	public constructor() {

		this.connection = null;
	}

	public openSession() {

		this.connection = app.locals.db;
	}

	public async findOne(valorDesejado: number, prazo: number) {

		const queryString = `
			SELECT 
					[CO_PRODUTO] AS coProduto,
					[NO_PRODUTO] AS noProduto,
					[PC_TAXA_JUROS] AS pcTaxaJuros,
					[NU_MINIMO_MESES] AS nuMinimoMeses,
					[NU_MAXIMO_MESES] AS nuMaximoMeses,
					[VR_MINIMO] AS vrMinimo,
					[VR_MAXIMO] AS vrMaximo
				FROM [dbo].[PRODUTO]
				WHERE (NU_MINIMO_MESES <= @prazo AND ISNULL(NU_MAXIMO_MESES, @prazo) >= @prazo) AND
				(VR_MINIMO <= @valorDesejado AND ISNULL(VR_MAXIMO, @valorDesejado) >= @valorDesejado);
		`;

		const queryResults = await this.connection?.request()
			.input('prazo', sql.Int, prazo)
			.input('valorDesejado', sql.Money, valorDesejado)
			.query(queryString);

		let produto: IProduto | null = null;
		if (queryResults) produto = (queryResults.recordset as sql.IRecordSet<IProduto>)[0];

		return produto
			? new Produto(

				produto.coProduto,
				produto.noProduto,
				produto.pcTaxaJuros,
				produto.nuMinimoMeses,
				produto.nuMaximoMeses,
				produto.vrMinimo,
				produto.vrMaximo
			)
			: null;
	}
}

export default new ProdutoRepository();

