import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SalesReportMain  from '../../components/salesreport/salesreport_main';

class SalesReport extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (data) => {
        console.log('data-->', data);
        // const that = this;
        // let { filters, submitAction, IdEditSaveSearch } = this.props;
        // const isNotOwnerSharedSearch = this.props.searchResult.criteriaSaveSearch != null
        //                               ? this.props.searchResult.criteriaSaveSearch.shared
        //                               : false;
        //
        // const userLogin = JSON.parse(sessionStorage.logindata);
        //
        // let saveSearchName = data.searchName;
        // let jlyHierarchy = false;
        // let watHierarchy = false;
        // let stoHierarchy = false;
        // let accHierarchy = false;
        // let obaHierarchy = false;
        // let sppHierarchy = false;
        // // check modify search or new search
        // // if have filters is mean modify search
        //
        // delete data.searchName;
        //
        // filters = GetFilterSearch(this, data, userLogin, filters, jlyHierarchy, watHierarchy, stoHierarchy,
        //     accHierarchy, obaHierarchy, sppHierarchy
        // );
        //
        // this.props.setCurrentPage(1);
        // sessionStorage.setItem('filters', JSON.stringify(filters));
        // switch (submitAction) {
        //     case 'save':
        //         if(jlyHierarchy){
        //             filters.push({'jewelryProductHierarchy':data.jewelryProductHierarchy})
        //         }
        //         if(watHierarchy){
        //             filters.push({'watchProductHierarchy':data.watchProductHierarchy})
        //         }
        //         if(stoHierarchy){
        //             filters.push({'stoneProductHierarchy':data.stoneProductHierarchy})
        //         }
        //         if(accHierarchy){
        //             filters.push({'accessoryProductHierarchy':data.accessoryProductHierarchy})
        //         }
        //         if(obaHierarchy){
        //             filters.push({'obaProductHierarchy':data.obaProductHierarchy})
        //         }
        //         if(sppHierarchy){
        //             filters.push({'sparePartProductHierarchy':data.sparePartProductHierarchy})
        //         }
        //         let paramsSaveSearch = {};
        //         if (IdEditSaveSearch != null) {
        //             if (isNotOwnerSharedSearch) {
        //                 paramsSaveSearch = {...paramsSaveSearch,
        //                     name:saveSearchName,
        //                     criteria:JSON.stringify(filters)};
        //             } else {
        //                 paramsSaveSearch = {...paramsSaveSearch,
        //                     id: IdEditSaveSearch,
        //                     name:saveSearchName,
        //                     criteria:JSON.stringify(filters)};
        //             }
        //         } else {
        //             paramsSaveSearch = {...paramsSaveSearch,
        //                 name:saveSearchName,
        //                 criteria:JSON.stringify(filters)};
        //         }
        //         // paramsSaveSearch = {...paramsSaveSearch, name:saveSearchName, criteria:JSON.stringify(filters)}
        //         // console.log('paramsSaveSearch-->',paramsSaveSearch);
        //         this.props.saveSearchCriteria(paramsSaveSearch);
        //         break;
        //     case 'search':
        //         this.context.router.push('/searchresult');
        //         break;
        //     default:
        // }
    }

    render(){
        return (
            <div>
                <SalesReportMain onSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}
module.exports = connect(mapStateToProps,null)(SalesReport);
