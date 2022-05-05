/* istanbul ignore file */
import { RoverFactory } from "./app/factories/rover-factory";
import { MarsFactory } from './app/factories/mars-factory';
import { MarsMissionController } from "./app/controllers/mars-mission.controller";
import { MissionCommandProcessor } from "./app/controllers/mars-mission.processor";

const marsMission = new MarsMissionController(new RoverFactory(), new MarsFactory(), new MissionCommandProcessor());

marsMission.instruct('5 5');

marsMission.instruct('1 2 N');
marsMission.instruct('LMLMLMLMM');

marsMission.instruct('3 3 E');
marsMission.instruct('MMRMMRMRRM');

marsMission.instruct('1 1 N');
marsMission.instruct('LMMLMMR');