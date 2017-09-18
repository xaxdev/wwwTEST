// module.exports = {
//     calculate: function(subtotal, state, done) {
//         console.log('getTax-->');
//         // implemented later or in parallel by our coworker
//     }
// };
function CartSummary(items) {
    this._items = items;
}

CartSummary.prototype.getTax = function(state, done) {
    tax.calculate(this.getSubtotal(), state, function(taxInfo) {
        done(taxInfo.amount);
    });
};

module.exports = CartSummary;
