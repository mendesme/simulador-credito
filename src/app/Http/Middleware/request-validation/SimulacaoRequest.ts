import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const SimulacaoSchema = z.object({

	valorDesejado: z.number()
		.positive()
		.lte(1_000_000_000_000, {
			message: 'A nao ser que voce seja o Elon Musk, nao simulamos valores acima de 1 trilhao'
		})
		.refine(x => x * 100 - Math.trunc(x * 100) < Number.EPSILON, {
			message: 'Deve haver no maximo dois digitos fracionarios'
		}),

	prazo: z.number()
		.int()
		.positive()
		.lte(2400, { message: 'Nao simulamos prazos acima de 200 anos. Por enquanto ainda nao conseguimos realizar cobrancas apos a morte, aguarde' })
});

class SimulacaoRequest {

	public indexPost(request: Request, response: Response, next: NextFunction) {

		const { valorDesejado, prazo } = request.body;

		try {
			SimulacaoSchema.parse({ valorDesejado, prazo });

			response.locals.simulacao = { valorDesejado, prazo };

			return next();

		} catch (e) {

			if (e instanceof ZodError) {

				const errors = e.flatten().fieldErrors;

				return response.status(400).json({ errors });
			}
			throw e;
		}
	}

	public index(request: Request, response: Response, next: NextFunction) {

		let valorDesejado = null;
		let prazo = null;

		if (request.query.valorDesejado) valorDesejado = +request.query.valorDesejado;
		if (request.query.prazo) prazo = +request.query.prazo;

		try {
			SimulacaoSchema.parse({ valorDesejado, prazo });

			response.locals.simulacao = { valorDesejado, prazo };

			return next();

		} catch (e) {

			if (e instanceof ZodError) {

				const errors = e.flatten().fieldErrors;

				return response.status(400).json({ errors });
			}
			throw e;
		}
	}
}

export default new SimulacaoRequest();



