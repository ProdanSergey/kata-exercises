/* istanbul ignore file */
import { RoverFactory } from "./app/factories/rover-factory";
import { MarsFactory } from './app/factories/mars-factory';
import { MissionControl } from "./app/mission-control";

const mission = new MissionControl(new RoverFactory(), new MarsFactory());

mission.execute('5 5');

mission.execute('1 2 N');
mission.execute('LMLMLMLMM');

mission.execute('3 3 E');
mission.execute('MMRMMRMRRM');

mission.execute('1 1 N');
mission.execute('LMMLMMR');