import { Direction, DirectionMap } from "../../constants";
import { Plateau } from "../plateau/plateau.service";
import { IRadio, IRover } from "./rover.definition";

export class Rover implements IRover {
	constructor(
		private x: number,
		private y: number,
		private head: Direction,
		private readonly map: Plateau
	) {}

	public move(): void {
		let x = this.x, y = this.y;
		
		switch (this.head) {
			case Direction.NORTH:
				y++;
				break;
			case Direction.SOUTH:
				y--;
				break;
			case Direction.WEST:
				x--;
				break;
			case Direction.EAST: 
				x++;
				break;
			default:
				break;
		}

		if (this.map.includes(x, y)) {
			[this.x, this.y] = [x, y];
		} else {
			this.turnAround();
		}
	}
	public turnLeft(): void {
		this.head = DirectionMap[this.head].left;
	}

	public turnRight(): void {
		this.head = DirectionMap[this.head].right;
	}

	public turnAround(): void {
		this.head = DirectionMap[this.head].opposite;
	}

	public echo(radio: IRadio): void {
		radio.log(this.x, this.y, this.head);
	}
}