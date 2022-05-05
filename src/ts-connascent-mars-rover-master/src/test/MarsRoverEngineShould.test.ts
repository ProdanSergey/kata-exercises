import {InitializationCommand} from "../main/commands/InitializationCommand";
import {Coordinate} from "../main/model/Coordinate";
import {StartingPositionCommand} from "../main/commands/StartingPositionCommand";
import {EastPosition, NorthPosition, Position, WestPosition} from "../main/model/Position";
import {TurnLeftCommand} from "../main/commands/TurnLeftCommand";
import {TurnRightCommand} from "../main/commands/TurnRightCommand";
import {MoveForwardCommand} from "../main/commands/MoveForwardCommand";
import {MarsRoverEngine} from "../main/app/MarsRoverEngine";

describe('MarsRoverEngine ', () => {
    beforeEach(() => {

    })

    it.each([
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new NorthPosition(2, 2))],
            new NorthPosition(2, 2)],
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new NorthPosition(2, 2)),
            new TurnLeftCommand()
        ], new WestPosition(2, 2)],
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new NorthPosition(2, 2)),
            new TurnRightCommand()
        ], new EastPosition(2, 2)],
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new NorthPosition(2, 2)),
            new MoveForwardCommand()
        ], new NorthPosition(2, 3)]
    ])('should execute commands %s then end in %s position', (commands, finalPosition) => {
        let roverEngine: MarsRoverEngine = new MarsRoverEngine();

        roverEngine.execute(Array.from(commands))

        let position = roverEngine.getPosition();
        expect(position).toEqual(finalPosition);
    })
})