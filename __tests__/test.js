jest.unmock('./fx.js');

import fx from "./fx.js";

describe('fx', () =>{
    it('multiplies input by 2', () =>{
       var res = fx(2);

       expect(res).toEqual(4);
    });

});

