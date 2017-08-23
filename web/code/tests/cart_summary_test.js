var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var CartSummary = require('./cart_summary');

describe('CartSummary', function() {
    it('getSubtotal() should return 0 if no items are passed in', function() {
          var cartSummary = new CartSummary([]);
          expect(cartSummary.getSubtotal()).to.equal(0);
    });
});
