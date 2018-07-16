export default function InitWillReceiveProps(that, nextProps){
    const { fields: { onhandLocationValue, onhandWarehouseValue, salesLocationValue, salesWarehouseValue, salesChannelValue } } = nextProps;

    if(that.props.user != undefined ){
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
    }else{
        if (that.state.selectedOnHandLocation) {

        }else{
            that.setState({chkLocation: onhandLocationValue.value});
        }
        if (that.state.selectedOnHandWarehouse) {

        }else{
            that.setState({chkWarehouse: onhandWarehouseValue.value});
        }
        if (that.state.selectedSalesLocation) {

        }else{
            that.setState({chkSalesLocation: salesLocationValue.value});
        }
        if (that.state.selectedSalesWarehouse) {

        }else{
            that.setState({chkSalesWarehouse: salesWarehouseValue.value});
        }
        if (that.state.selectedSalesChannel) {

        }else{
            that.setState({chkSalesChannel: salesChannelValue.value});
        }
    }
}
