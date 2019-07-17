import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import YingCatalogNameRows from './ying_catalog_name_rows'

class YingCatalogNameList extends Component {
    constructor(props) {
        super(props);
    }

    render = _=>{
        let { yingCatalogName, yingCatalogDetail, onDeleteCatalog } = this.props;
        
        if (yingCatalogName.length > 0) {
            const addId = (newItem, current)=>{
                let id = newItem.length != 0 ? Number(newItem.length) + 1 : 1
                const yingItem = {...current, id}

                newItem.push(yingItem)
                
                return newItem
            }
            yingCatalogName = yingCatalogName.reduce(addId,[])
        }

        if(yingCatalogName.length != 0){
            return (
                <div>
                    <table className="table table-bordered table-searchresult table-searchset">
                        <thead>
                            <tr>
                                <th><span>Id</span></th>
                                <th><span>Catalog Name</span></th>
                                <th><span>Status</span></th>
                                <th><span>Action</span></th>
                            </tr>
                        </thead>
                        {yingCatalogName.map((row) => {
                            return(
                                <YingCatalogNameRows key={row._id} row={row} yingCatalogDetail={yingCatalogDetail} onDeleteCatalog={onDeleteCatalog} 
                                   isShared={row.shared} />
                            );  
                        })}
                    </table>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
    };
}

module.exports = reduxForm(
    {
        form: 'YingCatalogNameList',
        fields: []
    }, mapStateToProps, null
)(YingCatalogNameList);