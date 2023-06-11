import EventEmitter from 'events';

class EventPublisher extends EventEmitter {

	private eventName: string;

	public constructor(eventName: string) {

		super();
		this.eventName = eventName;
	}

	public static create(eventName: string): EventPublisher {

		return new EventPublisher(eventName);
	}

	public subscribe(listener: (...args: any[]) => void): this {

		return super.on(this.eventName, listener);
	}

	public dispatch(...args: any[]) {

		return super.emit(this.eventName, ...args);
	}
}

export default EventPublisher;
