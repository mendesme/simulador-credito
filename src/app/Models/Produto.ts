import IProduto from './IProduto';

class Produto implements IProduto {

	public constructor(

		public coProduto: number,
		public noProduto: string,
		public pcTaxaJuros: number,
		public nuMinimoMeses: number,
		public nuMaximoMeses: number,
		public vrMinimo: number,
		public vrMaximo: number

	) { }
}

export default Produto;

