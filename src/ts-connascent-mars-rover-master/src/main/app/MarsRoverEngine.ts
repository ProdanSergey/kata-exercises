import {NorthPosition, Position} from "../model/Position";
import {ICommand} from "../commands/ICommand";

export class MarsRoverEngine {
    private position: Position = new NorthPosition(0, 0);

    execute(commands: Array<ICommand>): void {
        for (let command of commands) {
            this.position = command.execute(this.position);
        }
    }
    getPosition(): Position {
        return this.position;
    }


}