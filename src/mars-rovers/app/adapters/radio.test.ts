const spy = jest.spyOn(console, 'log').mockImplementation(() => jest.fn());

import { Radio } from "./radio";

describe('Mars Surface', () => {	
  afterAll(() => {
    spy.mockRestore();
  })

	it('should transmit a message by radio', () => {
		const plateau = new Radio();

    plateau.produce("message")
		
		expect(console.log).toHaveBeenCalledWith("message");
	});
});