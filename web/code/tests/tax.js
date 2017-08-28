module.exports = {
    calculate: function(subtotal, state, done) {
        console.log('getTax-->');
        // implemented later or in parallel by our coworker
    }
};

// CartSummary.prototype.getTax = function(state, done) {
//     console.log('getTax-->');
//     tax.calculate(this.getSubtotal(), state, function(taxInfo) {
//         done(taxInfo.amount);
//     });
// };
//
// module.exports = CartSummary;
