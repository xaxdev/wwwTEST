var _require = require('./utils');

var sort = _require.sort;
var filter = _require.filter;

var containsIgnoreCase = function containsIgnoreCase(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

function buildInitialState(props) {
  // console.log('buildInitialState props-->',props.currentPage);
  return {
    // Clone the initialData.
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
    // console.log('getInitialState nextProps-->',this.props);
    return buildInitialState(this.props);
  },

  getDefaultProps: function getDefaultProps() {
    // console.log('getDefaultProps -->');
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
    // console.log('componentWillReceiveProps nextProps-->',nextProps);
    this.setState(buildInitialState(nextProps));
  },

  componentWillMount: function componentWillMount() {
    // Do the initial sorting if specified.
    // console.log('componentWillMount -->');
    var _state = this.state;
    var sortBy = _state.sortBy;
    var data = _state.data;

    if (sortBy) {
      this.setState({ data: sort(sortBy, data) });
    }
  },

  onSort: function onSort(sortBy) {
    // console.log('onSort -->');
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data)
    });
  },

  onFilter: function onFilter(filterName, filterValue) {
    // console.log('onFilter this.state-->',this.state);
    var _state2 = this.state;
    var _countSearch = _state2.numberSearched;
    var filterValues = _state2.filterValues;
    var sortBy = _state2.sortBy;
    var _props = this.props;
    // if(!filterValues.globalSelect)  // select dropdown too
    //delete before search
    var dataBeforeDel = '';

    if (filterValues.globalSelect){
      dataBeforeDel = filterValues.globalSelect;
    }
    delete filterValues.globalSelect;

    var initialData = null;
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
    var newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    filterValues['globalSelect'] = dataBeforeDel;
    // if(dataBeforeDel != ''){
      delete filterValues.globalSearch;
      newData = filter(filters, filterValues, newData);
      newData = sort(sortBy, newData);
    // }

    filterValues[filterName] = filterValue;

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0,
      numberSearched: _countSearch + 1
    });
  },
  onFilterSelected: function onFilter(filterName, filterValue) {
    // console.log('onFilterSelected-->');
    var _state2 = this.state;
    var _countSearch = _state2.numberSearched;
    var filterValues = _state2.filterValues;

    //delete before search
    var dataBeforeDel = '';

    if (filterValues.globalSearch){
      dataBeforeDel = filterValues.globalSearch;
    }
    delete filterValues.globalSearch;

    var sortBy = _state2.sortBy;
    var _props = this.props;
    // var initialData = _props.initialData;
    var initialData = null;
    // if(_state2.data.length != 0){ //have result from Keyword
    //   if(filterValue == ''){
    //     initialData = _props.initialData;
    //   }else{
    //     initialData = _state2.data;
    //   }
    // }else{
      initialData = _props.initialData;
    // }
    var filters = _props.filters;

    var parseBool = function(str){
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
   var newFilter = parseBool(filterValue);

    filterValues[filterName] = filterValue;
    var newData = null;
    if(filterValue != ''){
      //   newData = initialData.filter(function(data) {
      //   // console.log('data-->',data);
      //   return data.status === newFilter;
      // });
      newData = initialData.filter(data => {
        return data.status === newFilter;
      });
    }else{
      newData = initialData;
    }
    // console.log('data-->',newData);
    // var newData = filter(filters, filterValues, initialData);
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
    // console.log('buildPage this.state.currentPage-->',this.state.currentPage);
    // console.log('buildPage this.state.prevPage-->',this.state.prevPage);
    // console.log('buildPage data-->',this.state.data)
    var _state3 = this.state;
    var data = _state3.data;
    var currentPage = _state3.currentPage;
    var pageLength = _state3.pageLength;

    var start = pageLength * currentPage;

    return {
      data: data.slice(start, start + pageLength),
      currentPage: currentPage,
      totalPages: Math.ceil(data.length / pageLength)
    };
  },

  onChangePage: function onChangePage(pageNumber) {
    // console.log('onChangePage -->');
    this.setState({ currentPage: pageNumber,prevPage:this.state.currentPage });
    // console.log('onChangePage pageNumber-->',pageNumber);
    // console.log('onChangePage currentPage-->',this.state.currentPage);
    // console.log('onChangePage prevPage-->',this.state.prevPage);
    // console.log('onChangePage this.state-->',this.state);
  },

  onPageLengthChange: function onPageLengthChange(value) {
    // console.log('onPageLengthChange -->');
    var newPageLength = +value;
    var _state4 = this.state;
    var currentPage = _state4.currentPage;
    var pageLength = _state4.pageLength;

    var newPage = Math.floor(currentPage * pageLength / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
