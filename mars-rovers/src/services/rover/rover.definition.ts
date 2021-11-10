export interface IRover {
	turnLeft(): void;
	turnRight(): void;
	turnAround(): void;
	move(): void;
	echo(radio: IRadio): void;
}

export interface IRadio {
	log(...args: unknown[]): void;
}