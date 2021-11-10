export enum Command {
	LEFT = 'L',
	RIGHT = 'R',
	MOVE = 'M',
}

export interface ITransmitter {
	consume(input: string): void;
}
