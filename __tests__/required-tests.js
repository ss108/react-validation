//jest.unmock('../lib/index.js');

import {Required} from "../lib/index.js";

describe('Required', () =>{
    let r = new Required(); 

    it('Should not be satisfied by undefined', () =>{
       var res = r.isSatisfiedBy(undefined); 
       expect(res).toBe(false);
    });

    it('Should not be satisfied by null', () => {
        var res = r.isSatisfiedBy(null);
        expect(res).toBe(false);
    });

    it('Should not be satisfied by an empty string', () =>{
        var res = r.isSatisfiedBy("");
        expect(res).toBe(false);
    });

});
