interface IParcela {

	numero: number;
	// saldoDevedor: number;
	valorAmortizacao: number;
	valorJuros: number;
	valorPrestacao: number;
}

const round = (num: number): number => +num.toFixed(2);

/* SAC - amortização fixa */
export const calculaSAC = (valorDesejado: number, prazo: number, taxaJuros: number) => {
	/*
	const parcelas = <IParcela[]>[
		{
			numero: 0,
			saldoDevedor: valorDesejado,
			valorAmortizacao: 0,
			valorJuros: 0,
			valorPrestacao: 0
		}
	];
	*/

	// Separei a propriedade 'saldoDevedor' do objeto 'parcela' uma vez que o formato da api 
	// não contempla este formato, do contrário, manteria como acima	
	const parcelas = <IParcela[]>[];
	const saldosDevedores = <number[]>[valorDesejado];

	const valorAmortizacao = round(valorDesejado / prazo);

	for (let index = 1; index <= prazo; index++) {

		const saldoDevedorAnterior = saldosDevedores[index - 1];

		const numero = index;
		const saldoDevedor = index != prazo ? round(saldoDevedorAnterior - valorAmortizacao) : 0;
		const valorJuros = round(saldoDevedorAnterior * taxaJuros);
		const valorPrestacao = round(valorAmortizacao + valorJuros);

		parcelas.push({ numero, valorAmortizacao, valorJuros, valorPrestacao });
		saldosDevedores.push(saldoDevedor);
	}

	return { 'tipo': 'SAC', parcelas };
};

/* PRICE - prestação fixa */
export const calculaPRICE = (valorDesejado: number, prazo: number, taxaJuros: number) => {

	const k = (1 + taxaJuros) ** prazo;
	const valorPrestacao = round(valorDesejado * ((taxaJuros * k) / (k - 1)));

	const parcelas = <IParcela[]>[];
	const saldosDevedores = <number[]>[valorDesejado];

	for (let index = 1; index <= prazo; index++) {

		const saldoDevedorAnterior = saldosDevedores[index - 1];

		const numero = index;
		const valorJuros = round(saldoDevedorAnterior * taxaJuros);
		const valorAmortizacao = round(valorPrestacao - valorJuros);
		const saldoDevedor = index != prazo ? round(saldoDevedorAnterior - valorAmortizacao) : 0;

		parcelas.push({ numero, valorAmortizacao, valorJuros, valorPrestacao });
		saldosDevedores.push(saldoDevedor);
	}

	return { 'tipo': 'PRICE', parcelas };
};


