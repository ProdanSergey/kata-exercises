/* istanbul ignore file */

import { Radio } from "../adapters/radio";
import { Rover, RoverParams } from "../adapters/rover";
import { Surface } from "../ports/surface";

export class RoverFactory {
  public build(params: RoverParams, surface: Surface): Rover {
    return new Rover(params, surface, new Radio())
  }
};