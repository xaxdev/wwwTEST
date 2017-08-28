var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var PDFSummary = require('./pdf_summary');

describe('PDFSummary', function() {
  it('getSubtotal() should return 0 if no items are passed in', function() {
    var pdfSummary = new PDFSummary([]);
    expect(pdfSummary.getSubtotal()).to.equal(0);
  });
});
