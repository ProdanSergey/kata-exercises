import { createStubInstance } from "sinon";
import { MarsFactory } from "../factories/mars-factory";
import { BuildMarsCommand, BuildMarsCommandHandler } from "./build-mars.command";

describe("Build Mars Command", () => {
  const marsFactory = createStubInstance(MarsFactory);

  it("should execute a command", () => {
    const command = new BuildMarsCommand("10 10", marsFactory);
    
    new BuildMarsCommandHandler(command).execute();

    expect(marsFactory.build.calledWith(10, 10)).toBe(true);
  });
});