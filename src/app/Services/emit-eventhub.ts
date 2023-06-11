import { EventHubProducerClient, EventData } from '@azure/event-hubs';

export const emitEventHub = async (envelope: object) => {

	const connectionString = process.env.EVENTHUB_CONNECTION as string;
	const eventHubName = process.env.EVENTHUB_HUBNAME as string;

	// Create a producer client to send messages to the event hub.
	const producer = new EventHubProducerClient(connectionString, eventHubName);

	try {
		// Prepare a batch of  events.
		const batch = await producer.createBatch();

		batch.tryAdd(envelope as EventData);
		// Send the batch to the event hub.
		await producer.sendBatch(batch);
		// Close the producer client.
		await producer.close();
		// eslint-disable-next-line no-console
		console.log('Dados enviados com sucesso para o event hub');

	} catch (err) {
		// eslint-disable-next-line no-console
		console.log('Erro ao enviar dados para o event hub: ', err);
	}
};

