import React, { Component } from 'react';
import DeleteModal from './delete_modal';

class RelatedItemRows extends Component {
    constructor(props) {
        super(props);

        this.renderCheckItem = this.renderCheckItem.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);

    }

    onClickGrid = (event) => {
        event.preventDefault();
        this.props.onClickList(event.currentTarget.id);
    }

    renderCheckItem = (val, row) => {        
        const { selectedRelateItem, listRelateItem } = this.props;
        
        let checkItem = false;
        if (!!listRelateItem) {
            checkItem = listRelateItem.find((id) => {
                return id == val;
            });
        }
        checkItem = !checkItem ? false : true;  //if undefined checked false else true
        return(
            <div className="checkbox checkbox-warning float-none img-center">
                <input type="checkbox" className="styled" type="checkbox" name={val} checked={checkItem} id={val} value={val}
                    onChange={selectedRelateItem}
                />
                <label className="checkbox1"></label>
            </div>
        );
    }
    renderEdit = (index, rows, id) => {
        const { editRelatedItemClick } = this.props;
        
        if (index == 0) {
            return (
                <td rowSpan={rows} className="img-center width-10">
                    <button id={id} className="btn btn-primary pull-xs-right btn-radius" onClick={editRelatedItemClick}>
                        Edit
                    </button>
                </td>
            )
        }
    }
    renderDelete = (index, rows, id, status) => {
        const { deleteRelatedItem, params } = this.props
        if (index == 0) {
            return(
                <td rowSpan={rows} className="width-20">
                    <DeleteModal key={ id } id={ id } status={status} deleteRelatedItem={deleteRelatedItem} params={params}/>
                </td>
            );
        }
    }

    render = _ => {
        const { row } = this.props;
        let rows = (row.items.length != 1)? row.items.length + 1: row.items.length;

        if (rows == 1) {            
            const [{ reference, order }] = row.items
            return (
                <tbody key={row._id} id={row._id}>
                    <tr>
                        <td className="width-5">{this.renderCheckItem(row._id)}</td>
                        <td className="width-5">{row.id}</td>
                        <td>{row.name}</td>
                        <td>{reference}</td>
                        <td>{order}</td>
                        {this.renderEdit(0, rows, row._id)}
                        {this.renderDelete(0, rows, row._id, row.status)}
                    </tr>
                </tbody>
            )
        } else {
            return (
                <tbody key={row._id} id={row._id}>
                    <tr>
                        <td rowSpan={rows} className="width-5">{this.renderCheckItem(row._id)}</td>
                        <td rowSpan={rows} className="width-5">{row.id}</td>
                        <td rowSpan={rows}>{row.name}</td>
                    </tr>
                    {
                        row.items.map((item, index)=>{
                            return(
                                <tr key={index} id={index}>
                                    <td>{item.reference}</td>
                                    <td>{item.order}</td>
                                    {this.renderEdit(index, rows, row._id)}
                                    {this.renderDelete(index, rows, row._id, row.status)}
                                </tr>
                            )
                        })
                    }
                </tbody>
            )
        }
    }
}

module.exports = RelatedItemRows