const _require = require('./utils');

const sort = _require.sort;
const filter = _require.filter;

const containsIgnoreCase = function containsIgnoreCase(a, b) {
    a = (a + '').toLowerCase().trim();
    b = (b + '').toLowerCase().trim();
    return b.indexOf(a) >= 0;
};

function buildInitialState(props) {
    return {
        data: props.initialData.slice(0),
        sortBy: props.initialSortBy,
        filterValues: {},
        currentPage: (!props.currentPage)?0:props.currentPage,
        pageLength: props.initialPageLength,
        prevPage: 0,
        numberSearched: 0
    };
}

module.exports = {
    getInitialState: function getInitialState() {
        return buildInitialState(this.props);
    },
    getDefaultProps: function getDefaultProps() {
        return {
            initialPageLength: 10,
            pageLengthOptions: [5, 10, 20],
            filters: {
                globalSearch: {
                    filter: containsIgnoreCase
                },
                globalSelect: {
                    filter: containsIgnoreCase
                }
            }
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        nextProps = Object.assign({},nextProps, {currentPage:this.state.currentPage});
        this.setState(buildInitialState(nextProps));
    },
    componentWillMount: function componentWillMount() {
        // Do the initial sorting if specified.
        const _state = this.state;
        const sortBy = _state.sortBy;
        const data = _state.data;

        if (sortBy) {
            this.setState({ data: sort(sortBy, data) });
        }
    },
    onSort: function onSort(sortBy) {
        this.setState({
            sortBy: sortBy,
            data: sort(sortBy, this.state.data)
        });
    },
    onFilter: function onFilter(filterName, filterValue) {
        const _state2 = this.state;
        const _countSearch = _state2.numberSearched;
        const sortBy = _state2.sortBy;
        const _props = this.props;
        let filterValues = _state2.filterValues;
        // if(!filterValues.globalSelect)  // select dropdown too
        //delete before search
        let dataBeforeDel = '';

        if (filterValues.globalSelect){
            dataBeforeDel = filterValues.globalSelect;
        }
        delete filterValues.globalSelect;

        let initialData = null;
        if(!filterValues.globalSelect){
            if(_state2.data.length == 0){
                initialData = _props.initialData;
            }else{
                if(filterValue == ''){
                    initialData = _props.initialData;
                }else{
                    initialData = _state2.data;
                }
            }
        }else{
            initialData = _props.initialData;
        }
        var filters = _props.filters;

        filterValues[filterName] = filterValue;
        let newData = filter(filters, filterValues, initialData);
        newData = sort(sortBy, newData);

        filterValues['globalSelect'] = dataBeforeDel;
        delete filterValues.globalSearch;
        newData = filter(filters, filterValues, newData);
        newData = sort(sortBy, newData);

        filterValues[filterName] = filterValue;

        this.setState({
            data: newData,
            filterValues: filterValues,
            currentPage: 0,
            numberSearched: _countSearch + 1
        });
    },
    onFilterSelected: function onFilter(filterName, filterValue) {
        const _state2 = this.state;
        const _countSearch = _state2.numberSearched;
        let filterValues = _state2.filterValues;

        //delete before search
        let dataBeforeDel = '';

        if (filterValues.globalSearch){
            dataBeforeDel = filterValues.globalSearch;
        }
        delete filterValues.globalSearch;

        const sortBy = _state2.sortBy;
        const _props = this.props;
        const filters = _props.filters;
        let initialData = null;
        initialData = _props.initialData;

        const parseBool = function(str){
            switch (str.toLowerCase ()) {
                case 'true':
                    return true;
                case 'false':
                    return false;
                case '':
                    return false;
                default:
                    throw new Error ('Boolean.parse: Cannot convert string to boolean.');
            }
        }
        let newFilter = parseBool(filterValue);

        filterValues[filterName] = filterValue;
        let newData = null;
        if(filterValue != ''){
            newData = initialData.filter(data => {
                return data.status === newFilter;
            });
        }else{
            newData = initialData;
        }

        newData = sort(sortBy, newData);

        filterValues['globalSearch'] = dataBeforeDel;
        if(dataBeforeDel != ''){
            delete filterValues.globalSelect;
            newData = filter(filters, filterValues, newData);
            newData = sort(sortBy, newData);
        }

        filterValues[filterName] = filterValue;
        this.setState({
            data: newData,
            filterValues: filterValues,
            currentPage: 0,
            numberSearched: _countSearch + 1
        });
    },
    // Pagination
    buildPage: function buildPage() {
        const _state3 = this.state;
        const data = _state3.data;
        const currentPage = _state3.currentPage;
        const pageLength = _state3.pageLength;

        const start = pageLength * currentPage;

        return {
            data: data.slice(start, start + pageLength),
            currentPage: currentPage,
            totalPages: Math.ceil(data.length / pageLength)
        };
    },
    onChangePage: function onChangePage(pageNumber) {
        this.setState({ currentPage: pageNumber,prevPage:this.state.currentPage });
    },
    onPageLengthChange: function onPageLengthChange(value) {
        const newPageLength = +value;
        const _state4 = this.state;
        const currentPage = _state4.currentPage;
        const pageLength = _state4.pageLength;

        const newPage = Math.floor(currentPage * pageLength / newPageLength);
        this.setState({
            pageLength: newPageLength,
            currentPage: newPage
        });
    }
};
