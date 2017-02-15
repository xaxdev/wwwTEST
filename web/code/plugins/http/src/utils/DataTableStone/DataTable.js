var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({
  displayName: 'DataTable',

  mixins: [DataMixin],

  render: function render() {
    var page = this.buildPage();
    // console.log('this.props-->',this.props);

    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'div',
        { className: 'row' },
      ),
      React.createElement(
        'div',
            { className: 'table-responsive' },
            React.createElement(Table, {
              className: 'table table-bordered table-searchresult',
              dataArray: page.data,
              columns: this.props.columns,
              keys: this.props.keys,
              buildRowOptions: this.props.buildRowOptions,
              sortBy: this.state.sortBy,
              onSort: this.onSort
            })
      )
    );
  }
});

module.exports = DataTable;
