import { Router } from 'express';
import SimulacaoController from '../app/Http/Controllers/SimulacaoController';
import SimulacaoRequest from '../app/Http/Middleware/request-validation/SimulacaoRequest';

const router = Router();

router.route('/simulacao')
	.get(SimulacaoRequest.index, SimulacaoController.index)
	.post(SimulacaoRequest.indexPost, SimulacaoController.indexPost);

export default router;









