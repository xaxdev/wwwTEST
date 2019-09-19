import React, { Component } from 'react';
import numberFormat from '../../utils/convertNumberformat';

class RenderViewSetItemTable extends Component {
    constructor(props) {
        super(props);
    }

    renderEdit = (index, reference) => {
        const { onClickEditItem } = this.props;
        let shared = false
        return (
            <td className="savesearch text-center">
                <a>
                    <div className={`${shared ? 'icon-edit fa' : 'icon-edit'}`}
                        onClick={onClickEditItem.bind(this, reference)}>
                    </div>
                </a>
            </td>
        )
    }

    renderDelete = (index, reference) => {
        const { onClickDeleteItem } = this.props;
        let shared = false
        return (
            <td className="savesearch text-center">
                <a>
                    <div className={`${shared ? 'icon-del fa' : 'icon-del'}`}
                        onClick={onClickDeleteItem.bind(this, reference)}>
                    </div>
                </a>
            </td>
        )
    }

    render = _ => {
        const { row } = this.props;        
        return (
            <tbody key={row.id} id={row.reference}>
                <tr>
                    <td className="width-6 text-center">{row.reference}</td>
                    <td>{row.description}</td>
                    <td className="text-center">{numberFormat(row.priceInUSD)}</td>
                    {this.renderEdit(0, row.reference)}
                    {this.renderDelete(0, row.reference)}
                </tr>
            </tbody>
        )
    }
}

module.exports = RenderViewSetItemTable