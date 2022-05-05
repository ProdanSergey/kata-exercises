import { createStubInstance } from "sinon";
import { Rover } from "../adapters/rover";
import { LaunchRoverCommand, LaunchRoverCommandHandler } from "./launch-rover.command";

describe("Launch Rover Command", () => {
  const rover = createStubInstance(Rover);

  it("should execute a command", () => {
    const command = new LaunchRoverCommand("LLM", rover);
    
    new LaunchRoverCommandHandler(command).execute();

    expect(rover.drive.calledWithExactly("LLM")).toBe(true);
  });
});