import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import YingCatalogNameRows from './ying_catalog_name_rows'
import RenderRenameCatalog from './render_rename_ying_catalog';
import * as yingsetaction from '../../actions/yingsetaction'

class YingCatalogNameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenRenameCatalogDialog: false
        }
    }

    clickRenameCatalog = (id, name) =>{
        let { yingCatalogReName, yingCatalogId } = this.props;
        yingCatalogReName.onChange(name)
        yingCatalogId.onChange(id)
        this.setState({ isOpenRenameCatalogDialog: true })
    }

    hideCatalogNameDialog = async (e) => {
        let { yingCatalogReName, yingCatalogId } = this.props;
        yingCatalogReName.onChange('')
        yingCatalogId.onChange('')
        this.setState({ isOpenRenameCatalogDialog: false })
    }

    renderCatalogNameDialog(){
        let { yingCatalogReName } = this.props;
    
        return(<RenderRenameCatalog that={this} yingCatalogReName={yingCatalogReName}/>)
    }

    saveReNameCatalog = (e)=> {
        e.preventDefault();
        let { yingCatalogReName, yingCatalogId } = this.props;
        let params = {id: yingCatalogId.value, name: yingCatalogReName.value};
        
        if (yingCatalogId.value != null) {
            let that = this.props.that
            this.props.updateCatalogName(params).then((value) => {
                if(value){
                    const params = {
                        page: that.state.currentPage + 1,
                        pageSize: that.state.pageLength
                    }
                    this.props.getYingName(params)
                    this.setState({ isOpenRenameCatalogDialog: false })
                }
            });
        }
    }

    render = _=>{
        let { yingCatalogName, yingCatalogDetail, onDeleteCatalog, yingCatalogReName } = this.props;
        
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
                                   isShared={row.shared} clickRenameCatalog={this.clickRenameCatalog} 
                                   hideCatalogNameDialog={this.hideCatalogNameDialog} />
                            );  
                        })}
                    </table>
                    {this.renderCatalogNameDialog()}
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
    }, mapStateToProps, yingsetaction
)(YingCatalogNameList);