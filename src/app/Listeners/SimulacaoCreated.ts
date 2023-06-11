import EventPublisher from './EventPublisher';
import { emitEventHub } from '@src/app/Services/emit-eventhub';

export default EventPublisher.create('SimulacaoCreated')
	.subscribe(emitEventHub);


	
	
