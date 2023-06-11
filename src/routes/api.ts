import { Router } from 'express';
import SimulacaoController from '@src/app/Http/Controllers/SimulacaoController';
import SimulacaoRequest from '@src/app/Http/Middleware/request-validation/SimulacaoRequest';

const router = Router();

router.route('/simulacao')
	.get(SimulacaoRequest.index, SimulacaoController.index)
	.post(SimulacaoRequest.indexPost, SimulacaoController.index);

export default router;



