export default function InitWillReceiveProps(that, nextProps){
    const { props } = that;
    const { fields: { onhandLocationValue, onhandWarehouseValue, salesLocationValue, salesWarehouseValue, salesChannelValue } } = nextProps;

    if(that.props.user.permission.onhandLocation != undefined){
        if (that.state.selectedOnHandLocation) {

        }else{
            that.setState({chkLocation: onhandLocationValue.value});
        }
    }

    if(that.props.user.permission.onhandWarehouse != undefined){
        if (that.state.selectedOnHandWarehouse) {

        }else{
            that.setState({chkWarehouse: onhandWarehouseValue.value});
        }
    }

    if(that.props.user.permission.salesLocation != undefined){
        if (that.state.selectedSalesLocation) {

        }else{
            that.setState({chkSalesLocation: salesLocationValue.value});
        }
    }

    if(that.props.user.permission.salesWarehouse != undefined){
        if (that.state.selectedSalesWarehouse) {

        }else{
            that.setState({chkSalesWarehouse: salesWarehouseValue.value});
        }
    }

    if(that.props.user.permission.salesChannel != undefined){
        if (that.state.selectedSalesChannel) {

        }else{
            that.setState({chkSalesChannel: salesChannelValue.value});
        }
    }

    if(props.HierarchyValue != null){
        if(props.HierarchyValue.length != 0){
            if(props.HierarchyValue.JLY != undefined){
                that.refs.treeviewJLY.handleChange(props.HierarchyValue.JLY);
            }
            if(props.HierarchyValue.WAT != undefined){
                that.refs.treeviewWAT.handleChange(props.HierarchyValue.WAT);
            }
            if(props.HierarchyValue.STO != undefined){
                that.refs.treeviewSTO.handleChange(props.HierarchyValue.STO);
            }
            if(props.HierarchyValue.ACC != undefined){
                that.refs.treeviewACC.handleChange(props.HierarchyValue.ACC);
            }
            if(props.HierarchyValue.OBA != undefined){
                that.refs.treeviewOBA.handleChange(props.HierarchyValue.OBA);
            }
            if(props.HierarchyValue.SPP != undefined){
                that.refs.treeviewSPP.handleChange(props.HierarchyValue.SPP);
            }
        }
    }else{
        that.refs.treeviewJLY.handleChange([]);
        that.refs.treeviewWAT.handleChange([]);
        that.refs.treeviewSTO.handleChange([]);
        that.refs.treeviewACC.handleChange([]);
        that.refs.treeviewOBA.handleChange([]);
        that.refs.treeviewSPP.handleChange([]);
    }

    if(props.SalesHierarchyValue != null){
        if(props.SalesHierarchyValue.length != 0){
            if(props.SalesHierarchyValue.JLY != undefined){
                that.refs.treeviewSalesJLY.handleChange(props.SalesHierarchyValue.JLY);
            }
            if(props.SalesHierarchyValue.WAT != undefined){
                that.refs.treeviewSalesWAT.handleChange(props.SalesHierarchyValue.WAT);
            }
            if(props.SalesHierarchyValue.STO != undefined){
                that.refs.treeviewSalesSTO.handleChange(props.SalesHierarchyValue.STO);
            }
            if(props.SalesHierarchyValue.ACC != undefined){
                that.refs.treeviewSalesACC.handleChange(props.SalesHierarchyValue.ACC);
            }
            if(props.SalesHierarchyValue.OBA != undefined){
                that.refs.treeviewSalesOBA.handleChange(props.SalesHierarchyValue.OBA);
            }
            if(props.SalesHierarchyValue.SPP != undefined){
                that.refs.treeviewSalesSPP.handleChange(props.SalesHierarchyValue.SPP);
            }
        }
    }else{
        that.refs.treeviewSalesJLY.handleChange([]);
        that.refs.treeviewSalesWAT.handleChange([]);
        that.refs.treeviewSalesSTO.handleChange([]);
        that.refs.treeviewSalesACC.handleChange([]);
        that.refs.treeviewSalesOBA.handleChange([]);
        that.refs.treeviewSalesSPP.handleChange([]);
    }
}
