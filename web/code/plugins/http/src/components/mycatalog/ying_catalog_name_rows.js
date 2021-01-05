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

    showTooltip = _=> {
        this.setState({isTooltipActive: true})
    }

    hideTooltip = _=>{
        this.setState({isTooltipActive: false});
    }

    renderAction = (index, id, name) => {
        const { isShared, clickRenameCatalog } = this.props;
        let shared = false

        return (
            <td className="savesearch text-center" key={id} id={id}>
                <a className={`${isShared ? 'icon-edit fa' : 'icon-edit'}`} onClick={isShared ? '' : this.onClickEditCatalog.bind(this,id)}>
                    {/* <div className={`${isShared ? 'icon-edit fa' : 'icon-edit'}`}
                        onClick={isShared ? '' : this.onClickEditCatalog.bind(this,id)}>
                    </div> */}
                </a>
                <a className="icon-search" onClick={this.onClickEditCatalog.bind(this,id)}>
                    {/* <div className="icon-search"
                        onClick={this.onClickEditCatalog.bind(this,id)}>
                    </div> */}
                </a>
                <ShareModal key={ id } id={id} />
                <a className={`${isShared ? 'icon-del fa' : 'icon-del'}`} onClick={isShared ? '' : this.onClickDeleteCatalog.bind(this,id)}>
                    {/* <div className={`${isShared ? 'icon-del fa' : 'icon-del'}`}
                        onClick={isShared ? '' : this.onClickDeleteCatalog.bind(this,id)}>
                    </div> */}
                </a>
                <a>
                    <div className={`${isShared ? 'icon-rename fa' : 'icon-rename'}`} id="rename" 
                        onClick={isShared ? '' : clickRenameCatalog.bind(this, id, name)}>
                    </div>
                </a>
            </td>
        )
    }

    render = _ => {
        const { row, yingCatalogReName } = this.props;
        return (
            <tbody key={row._id} id={row._id}>
                <tr key={row._id} id={row._id}>
                    <td className="width-5 text-center">{row.id}</td>
                    <td>{row.name}</td>
                    <td className="text-center">{row.status}</td>
                    {this.renderAction(0, row._id, row.name)}
                </tr>
            </tbody>
        )
    }
}

module.exports = YingCatalogNameRows