//jest.unmock('../lib/index.js');

import {Required} from "../lib/index.js";

describe('Required', () =>{
    let r = new Required(); 

    it('Should not be satisfied by undefined', () =>{
       var res = r.isSatisfiedBy(undefined); 
       expect(res).toBe(false);
    });

});
