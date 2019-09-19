import React, { Component } from 'react';
import ShareModal from './share_modal_ying_catalog';

class YingCatalogNameRows extends Component {
    constructor(props) {
        super(props);

    }

    onClickEditCatalog = (id) =>{
        // yingCatalogDetail from ./src/containers/yingcatalog/yingcatalog_list
        const { yingCatalogDetail, isShared }  = this.props;
        yingCatalogDetail(id, isShared);
    }

    onClickDeleteCatalog = (id) =>{
        // yingCatalogDetail from ./src/containers/yingcatalog/yingcatalog_list
        const { onDeleteCatalog }  = this.props;
        onDeleteCatalog(id);
    }

    renderAction = (index, id) => {
        const { isShared } = this.props;
        let shared = false

        return (
            <td className="savesearch text-center">
                <a>
                    <div className={`${isShared ? 'icon-edit fa' : 'icon-edit'}`}
                        onClick={isShared ? '' : this.onClickEditCatalog.bind(this,id)}>
                    </div>
                </a>
                <a>
                    <div className="icon-search"
                        onClick={this.onClickEditCatalog.bind(this,id)}>
                    </div>
                </a>
                <ShareModal key={ id } id={id} />
                <a>
                    <div className={`${isShared ? 'icon-del fa' : 'icon-del'}`}
                        onClick={isShared ? '' : this.onClickDeleteCatalog.bind(this,id)}>
                    </div>
                </a>
            </td>
        )
    }

    render = _ => {
        const { row } = this.props;

        return (
            <tbody key={row._id} id={row._id}>
                <tr>
                    <td className="width-5 text-center">{row.id}</td>
                    <td>{row.name}</td>
                    <td className="text-center">{row.status}</td>
                    {this.renderAction(0, row._id)}
                </tr>
            </tbody>
        )
    }
}

module.exports = YingCatalogNameRows