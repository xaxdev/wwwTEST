const React = require('react');
const Table = require('./Table');
const Pagination = require('./Pagination');
const SelectField = require('./SelectField');
const SearchField = require('./SearchField');

const DataMixin = require('./DataMixin');

const DataTable = React.createClass({
    displayName: 'DataTable',

    mixins: [DataMixin],

    render: function render() {
        const page = this.buildPage();

        return React.createElement(
            'div',
            { className: this.props.className },
            React.createElement( 'div', { className: 'row' } ),
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
