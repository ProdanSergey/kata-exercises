import {Coordinate} from "./Coordinate";
import {Direction} from "./Direction";
import {format} from "util";
import deepEqual = require("deep-equal");

export class Position {
    private coordinate: Coordinate;
    private direction: Direction;
    
    constructor(x: number, y: number, direction: Direction) {
        this.coordinate = new Coordinate(x, y);
        this.direction = direction;
    }

    turnLeft(): Position {
        return new Position(this.coordinate.x, this.coordinate.y, this.direction.turnLeft())
    }

    turnRight(): Position {
        return new Position(this.coordinate.x, this.coordinate.y, this.direction.turnRight())
    }

    moveForward() {
        var coordinate: Coordinate = new Coordinate(0, 0);
        if (this.direction.isNorth()) {
            coordinate = this.coordinate.moveNorth()
        } else if (this.direction.isEast()) {
            coordinate = this.coordinate.moveEast()
        } else if (this.direction.isSouth()) {
            coordinate = this.coordinate.moveSouth()
        } else if (this.direction.isWest()) {
            coordinate = this.coordinate.moveWest();
        }
        return new Position(coordinate.x, coordinate.y, this.direction);
    }

    toString(): string {
        return format("%s %s", this.coordinate.toString(), this.direction.toString())
    }

    equals(o: Position): boolean {
        return deepEqual(this.coordinate, o.coordinate) && this.direction === o.direction;
    }


}

export class NorthPosition extends Position {
  constructor(x: number, y: number) {
    super(x, y, Direction.NORTH());
  }
}

export class EastPosition extends Position {
  constructor(x: number, y: number) {
    super(x, y, Direction.EAST());
  }
}

export class SouthPosition extends Position {
  constructor(x: number, y: number) {
    super(x, y, Direction.SOUTH());
  }
}

export class WestPosition extends Position {
  constructor(x: number, y: number) {
    super(x, y, Direction.WEST());
  }
}