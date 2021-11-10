/* istanbul ignore file */
import { Transmitter } from "./services/transmitter/transmitter.service";

const transmitter = new Transmitter();

transmitter.consume('5 5');

transmitter.consume('1 2 N');
transmitter.consume('LMLMLMLMM');

transmitter.consume('3 3 E');
transmitter.consume('MMRMMRMRRM');

transmitter.consume('1 1 N');
transmitter.consume('LMMLMMR');