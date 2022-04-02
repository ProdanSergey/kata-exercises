/* istanbul ignore file */

import { Mars } from "../adapters/mars";

export class MarsFactory {  
  public build(lat: number, long: number): Mars {
    return new Mars(lat, long);
  }
};