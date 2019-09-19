import React, { Component } from 'react';
import RenderViewSetItemTable from './render_view_set_item_table'

class RenderViewSetDetailItem extends Component {
    constructor(props) {
        super(props);
    }

    render = _ => {
        const { listItem, onClickAddItem, onClickEditItem, onClickDeleteItem } = this.props;
        return(
            <div className="col-sm-12">
                <div className="col-sm-4 m-width-60 ft-white m-nopadding"></div>
                <div className="col-sm-8 m-width-40 m-nopadding text-right maring-t15">
                    <div className="col-sm-12 col-xs-12 nopadding">
                        <div className="col-sm-12 col-xs-4 ft-white nopad-ipl">
                            <button className="btn btn-primary btn-radius" type="button" onClick={onClickAddItem} >Add Item</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 m-width-60 m-nopadding">
                    <table className="table table-bordered table-searchresult table-searchset">
                        <thead>
                            <tr>
                                <th><span>Item Reference</span></th>
                                <th><span>Item Description</span></th>
                                <th><span>Retail Price (USD)</span></th>
                                <th><span>Edit</span></th>
                                <th><span>Delete</span></th>
                            </tr>
                        </thead>
                        {listItem.map(row=>{
                            return <RenderViewSetItemTable row={row} onClickEditItem={onClickEditItem} onClickDeleteItem={onClickDeleteItem}/>
                        })}
                    </table>
                </div>
            </div>
        )
    }
}

module.exports = RenderViewSetDetailItem