import { createStubInstance } from "sinon";
import { Direction } from "../../shared";
import { Mars } from "../adapters/mars";
import { RoverFactory } from "../factories/rover-factory";
import { BuildRoverCommand, BuildRoverCommandHandler } from "./build-rover.command";

describe("Build Mars Command", () => {
  const roverFactory = createStubInstance(RoverFactory);
  const mars = createStubInstance(Mars);

  it("should execute a command", () => {
    const command = new BuildRoverCommand("1 1 W", roverFactory, mars);
    
    new BuildRoverCommandHandler(command).execute();

    expect(roverFactory.build.calledWithExactly({ x: 1, y: 1, direction: Direction.WEST }, mars)).toBe(true);
  });
});