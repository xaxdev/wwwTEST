let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect; // we are using the "expect" style of Chai
let CartSummary = require('./cart_summary');
let tax = require('./tax');

describe('CartSummary', function() {
    it('getSubtotal() should return the sum of the price * quantity for all items', function() {
          var cartSummary = new CartSummary([
              { id: 1, quantity: 4, price: 50 },
              { id: 2, quantity: 2, price: 30 },
              { id: 3, quantity: 1, price: 40 }
          ]);
          expect(cartSummary.getSubtotal()).to.equal(300);
    });
});

// describe('getTax()', function() {
//     beforeEach(function() {
//         sinon.stub(tax, 'calculate', function(subtotal, state, done) {
//             setTimeout(function() {
//                 done({
//                     amount: 300
//                 });
//             }, 0);
//         });
//     });
//
//     afterEach(function() {
//         tax.calculate.restore();
//     });
//
//     it('get Tax() should execute the callback function with the tax amount', function(done) {
//         var tax = new tax([
//             { id: 1, quantity: 4, price: 50 },
//             { id: 2, quantity: 2, price: 30 },
//             { id: 3, quantity: 1, price: 40 }
//         ]);
//         tax.getTax('NY', function(taxAmount) {
//             expect(taxAmount).to.equal(300);
//             done();
//         });
//     });
// });
