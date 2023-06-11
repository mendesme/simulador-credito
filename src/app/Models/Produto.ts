export interface IProduto {

	coProduto: number;
	noProduto: string;
	pcTaxaJuros: number;
	nuMinimoMeses: number;
	nuMaximoMeses: number;
	vrMinimo: number;
	vrMaximo: number;
}

export class Produto implements IProduto {

	public constructor(

		public readonly coProduto: number,
		public readonly noProduto: string,
		public readonly pcTaxaJuros: number,
		public readonly nuMinimoMeses: number,
		public readonly nuMaximoMeses: number,
		public readonly vrMinimo: number,
		public readonly vrMaximo: number

	) { }
}
