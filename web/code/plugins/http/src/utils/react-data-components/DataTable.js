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

    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'div',
        { className: 'row m-user' },
        React.createElement(
          'div',
          { className: 'col-md-5 col-sm-6 search-group m-nopadding' },
          React.createElement(SelectField, {
            id: 'page-menu',
            label: 'Page size:',
            value: this.state.pageLength,
            options: this.props.pageLengthOptions,
            onChange: this.onPageLengthChange
          }),
          React.createElement(SearchField, {
            id: 'search-field',
            label: 'Keyword:',
            value: this.state.filterValues.globalSearch,
            onChange: this.onFilter.bind(this, 'globalSearch'),
            label2: 'Status:',
            valueselect:this.state.filterValues.globalSelect,
            onChangeSelect:this.onFilterSelected.bind(this, 'globalSelect')
          })
        ),
        React.createElement(
          'div',
          { className: 'col-md-7 col-sm-6 col-xs-12 m-nopadding maring-b10' },
          React.createElement(Pagination, {
            className: 'pagination pull-right',
            currentPage: page.currentPage,
            totalPages: page.totalPages,
            onChangePage: this.onChangePage
          })
        )
      ),
      React.createElement(
        'div',
            { className: 'table-responsive' },
            React.createElement(Table, {
              className: 'table table-bordered',
              dataArray: page.data,
              columns: this.props.columns,
              keys: this.props.keys,
              buildRowOptions: this.props.buildRowOptions,
              sortBy: this.state.sortBy,
              onSort: this.onSort
            })
      ),
      React.createElement(
          'div',
          { className: 'col-sm-12 col-xs-12 m-nopadding nopadding' },
          React.createElement(Pagination, {
            className: 'pagination pull-right',
            currentPage: page.currentPage,
            totalPages: page.totalPages,
            onChangePage: this.onChangePage
          })
        )
    );
  }
});

module.exports = DataTable;
